import { exportPages, importPages, load } from './deps.ts';

const env = await load();

const sid = Deno.env.get('SID') || env['SID']; //シークレットID
const exportingProjectName = Deno.env.get('SOURCE_PROJECT_NAME'); //インポート元(本来はprivateプロジェクト)
const importingProjectName = Deno.env.get('DESTINATION_PROJECT_NAME'); //インポート先(publicプロジェクト)
const shouldDuplicateByDefault = Deno.env.get('SHOULD_DUPLICATE_BY_DEFAULT') === 'True';

console.log('sid:', sid);

if (typeof sid !== 'string') {
  throw new Error('The sid must be a string.');
}
if (typeof exportingProjectName !== 'string') {
  throw new Error('The exportingProjectName must be a string.');
}
if (typeof importingProjectName !== 'string') {
  throw new Error('The importingProjectName must be a string.');
}

console.log(`Exporting a json file from "/${exportingProjectName}"...`);
const result = await exportPages(exportingProjectName, {
  sid,
  metadata: true,
});
if (!result.ok) {
  const error = new Error();
  error.name = `${result.value.name} when exporting a json file`;
  error.message = result.value.message;
  throw error;
}
const { pages } = result.value;
console.log(`Export ${pages.length}pages:`);
for (const page of pages) {
  console.log(`\t${page.title}`);
}

const importingPages = pages.filter(({ lines }) => {
  if (lines.some((line) => line.text.includes('[private.icon]'))) {
    return false;
  } else if (lines.some((line) => line.text.includes('[public.icon]'))) {
    return true;
  } else {
    return shouldDuplicateByDefault;
  }
});

if (importingPages.length === 0) {
  console.log('No page to be imported found.');
} else {
  console.log(`Importing ${importingPages.length} pages to "/${importingProjectName}"...`);
  const result = await importPages(
    importingProjectName,
    {
      pages: importingPages,
    },
    {
      sid,
    }
  );
  if (!result.ok) {
    const error = new Error();
    error.name = `${result.value.name} when importing pages`;
    error.message = result.value.message;
    throw error;
  }
  console.log(result.value);
}
