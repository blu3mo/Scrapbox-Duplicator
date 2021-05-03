const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv').config();

async function exportJSON(projectName, sid) {
    const cookie = "connect.sid=" + sid;

    const meRes = await axios({
        method: "get",
        url: "https://scrapbox.io/api/users/me",
        headers: {
            "Cookie" : cookie,
        }
    })
    const csrfToken = meRes.data.csrfToken;

    const exportRes = await axios({
        method: "post",
        url: `https://scrapbox.io/api/page-data/export/${projectName}.json`,
        headers: {
            "Cookie" : cookie,
            "X-CSRF-TOKEN": csrfToken,
        }
    })
    return exportRes.data
}

async function importJSON(projectName, fileName, sid) {
    const url = new URL(`https://scrapbox.io/projects/${projectName}/settings/page-data`);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    //ページを開く
    await page.setCookie({name: 'connect.sid', value: sid, domain: 'scrapbox.io'});
    await page.goto(url.toString());
    await page.waitFor(2000);

    //アップロード
    const inputUploadHandle = await page.$('input[name="import-file"]');
    inputUploadHandle.uploadFile(fileName);
    await page.waitFor(4000);

    //インポート
    const importSubmitButton = await page.$x("//button[contains(., 'Import Pages')]");
    await importSubmitButton[0].click();
    await page.waitFor(60000); //転送量に応じて調整

    await browser.close();
}


(async() => {
    const env = process.env;
    const sid = env.SID;
    const exportingProjectName = env.SOURCE_PROJECT_NAME //インポート元(本来はprivateプロジェクト)
    const importingProjectName = env.DESTINATION_PROJECT_NAME //インポート先(publicプロジェクト)

    const exportedJSON = await exportJSON(exportingProjectName, sid);
    exportedJSON.pages = exportedJSON.pages.filter((page) => {
        const linesWithPublicIcon = page.lines.filter(line => {
            return line.includes("[public.icon]");
        })
        return linesWithPublicIcon.length != 0
    })
    fs.writeFileSync('/tmp/tmp.json', JSON.stringify(exportedJSON));
    await importJSON(importingProjectName, "/tmp/tmp.json", sid);
})();