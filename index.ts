import "https://deno.land/x/dotenv/load.ts";
import { exportPages, importPages } from "./deps.ts";

const sid = Deno.env.get("SID");
const exportingProjectName = Deno.env.get("SOURCE_PROJECT_NAME"); //インポート元(本来はprivateプロジェクト)
const importingProjectName = Deno.env.get("DESTINATION_PROJECT_NAME"); //インポート先(publicプロジェクト)
const shouldDuplicateByDefault: boolean =
  (Deno.env.get("SHOULD_DUPLICATE_BY_DEFAULT") === "True");

if (
  sid !== undefined && exportingProjectName !== undefined &&
  importingProjectName !== undefined
) {
  console.log(`Exporting a json file from "/${exportingProjectName}"...`);
  const result = await exportPages(exportingProjectName, {
    sid,
    metadata: false,
  });
  if (!result.ok) {
    console.error(`Export Error[${result.name}]:\n\t${result.message}`);
  } else {
    const { pages } = result;
    console.log("exported: ", pages);

    const importingPages = pages.filter(({ lines }) => {
      if (lines.some((line) => line.includes("[private.icon]"))) {
        return false;
      } else if (lines.some((line) => line.includes("[public.icon]"))) {
        return true;
      } else {
        return shouldDuplicateByDefault;
      }
    });
    if (importingPages.length > 0) {
      console.log(
        `Importing ${importingPages.length} pages to "/${importingProjectName}"...`,
      );
      const result = await importPages(importingProjectName, {
        pages: importingPages,
      }, {
        sid,
      });
      if (result.ok) {
        console.log(result.message);
      } else {
        console.error(`Import Error[${result.name}]:\n\t${result.message}`);
      }
    } else {
      console.log("No page to be imported found.");
    }
  }
} else {
  console.log("Environmental variables are missing.");
}
