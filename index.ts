import "https://deno.land/x/dotenv/load.ts";

interface Page {
  title: string;
  lines: string[];
  id?: string;
  created?: number;
  updated?: number;
}
interface ExportResponse {
  name: string;
  displayName: string;
  exported: number;
  pages: Page[];
}

const cookie = (sid: string) => `connect.sid=${sid}`;

async function csrfToken(sid: string) {
  const res = await fetch("https://scrapbox.io/api/users/me", {
    headers: { Cookie: cookie(sid) },
  });
  const json = await res.json();
  const { csrfToken } = json as { csrfToken: string };
  return csrfToken;
}

async function exportJSON(projectName: string, sid: string) {
  const res = await fetch(
    `https://scrapbox.io/api/page-data/export/${projectName}.json`,
    {
      method: "POST",
      headers: {
        Cookie: cookie(sid),
        "X-CSRF-TOKEN": await csrfToken(sid),
      },
    },
  );
  const { pages } = (await res.json()) as ExportResponse;

  return pages;
}

async function importJSON(
  projectName: string,
  sid: string,
  importPages: Page[],
) {
  const formData = new FormData();
  formData.append(
    "import-file",
    new Blob([JSON.stringify({ pages: importPages })], {
      type: "application/octet-stream",
    }),
  );
  formData.append("name", "undefined");

  return await fetch(
    `https://scrapbox.io/api/page-data/import/${projectName}.json`,
    {
      method: "POST",
      headers: {
        Cookie: cookie(sid),
        Accept: "application/json, text/plain, */*",
        "X-CSRF-TOKEN": await csrfToken(sid),
      },
      body: formData,
    },
  );
}

const sid = Deno.env.get("SID");
const exportingProjectName = Deno.env.get("SOURCE_PROJECT_NAME"); //インポート元(本来はprivateプロジェクト)
const importingProjectName = Deno.env.get("DESTINATION_PROJECT_NAME"); //インポート先(publicプロジェクト)
const defaultSharingMode = Deno.env.get("DEFAULT_SHARING_MODE") ?? "private";

const duplicateByDefault: boolean = (defaultSharingMode === "public")

if (sid !== undefined && exportingProjectName !== undefined && importingProjectName !== undefined) {
  console.log(`Exporting a json file from "/${exportingProjectName}"...`);
  const pages = await exportJSON(exportingProjectName, sid);
  console.log("exported: ", pages);

  const importingPages = pages.filter(({ lines }) => {
    if (lines.some((line) => line.includes("[private.icon]"))) {
      return false;
    } else if (lines.some((line) => line.includes("[public.icon]"))) {
      return true;
    } else {
      return duplicateByDefault;
    }
  });
  if (importingPages.length > 0) {
    console.log(`Importing ${importingPages.length} pages to "/${importingProjectName}"...`);
    await importJSON(importingProjectName, sid, importingPages);
  } else {
    console.log("No page to be imported found.");
  }
} else {
  console.log("Environmental variables are missing.");
}
