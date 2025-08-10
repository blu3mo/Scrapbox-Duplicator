import type { ExportedData } from "@cosense/types/rest";
import { ensure, exportPages, importPages, isString } from "./deps.ts";

const sid = ensure(Deno.env.get("SID"), isString);
// インポート元 (privateプロジェクト)
const exportingProjectName = ensure(
  Deno.env.get("SOURCE_PROJECT_NAME"),
  isString,
);
// インポート先 (publicプロジェクト)
const importingProjectName = ensure(
  Deno.env.get("DESTINATION_PROJECT_NAME"),
  isString,
);
// [private.icon] も [public.icon] も無いページを複製するかどうか
const shouldDuplicateByDefault =
  Deno.env.get("SHOULD_DUPLICATE_BY_DEFAULT") === "True";

console.log(`Exporting a json file from "/${exportingProjectName}"...`);
const result = await exportPages(exportingProjectName, {
  sid,
  metadata: true,
});
if (!result.ok) {
  const error = new Error();
  error.name = `${result.err.name} when exporting a json file`;
  error.message = result.err.message;
  throw error;
}
const { pages } = result.val as ExportedData<true>;
console.log(`Export ${pages.length}pages:`);
for (const page of pages) {
  console.log(`\t${page.title}`);
}

const importingPages = pages.filter(({ lines }) => {
  if (lines.some((line) => line.text.includes("[private.icon]"))) {
    return false;
  } else if (lines.some((line) => line.text.includes("[public.icon]"))) {
    return true;
  } else {
    return shouldDuplicateByDefault;
  }
});

if (importingPages.length === 0) {
  console.log("No page to be imported found.");
} else {
  console.log(
    `Importing ${importingPages.length} pages to "/${importingProjectName}"...`,
  );
  const result = await importPages(
    importingProjectName,
    { pages: importingPages },
    { sid },
  );
  if (!result.ok) {
    const error = new Error();
    error.name = `${result.err.name} when importing pages`;
    error.message = result.err.message;
    throw error;
  }
  console.log(result.val);
}
