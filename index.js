const axios = require('axios');
const jsoncsv = require('json-2-csv')
const puppeteer = require('puppeteer');
const fs = require('fs');

const ascap = {
    url: "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I"
}

async function getData(resolve) {
    try {

        setTimeout(resolve, 60 * 1000);

        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

        const page = await browser.newPage();

        console.log('Navigating')
        await page.goto(ascap.url, { waitUntil: 'networkidle0' });

        const iframe = await page.$('.truste_popframe');
        const frameContent = await iframe.contentFrame();

        const button1 = await frameContent.$('.call');
        await button1.click()

        await addDelay();

        const button2 = await page.$$('button');
        await button2[22].click();

        const button3 = await page.$$('button');
        await button3[20].click();

        await addDelay();

        const currentDate = new Date();

        let content = {
            date: currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate(),
            total: 0,
            songs: []
        };

        const button4 = await page.$('.c-card__body');
        await button4.click();

        do {
            const response = await page.waitForResponse(response => response.url().includes('works'));
            const json = await response.json();
            content.total = json.meta.totalCount;

            const registeredSongs = json.result.map(r => {
                const creators = r.interestedParties.filter(p => p.roleCde == "W");
                const creatorsString = creators.map(p => p.fullName.trim()).sort().join(', ');

                return {ISWC: r.ISWCCde, workId: r.workId, title: r.workTitle, creators: creatorsString, source: 'ASCAP', status: 'Unreleased'}
            });
            const arr = content.songs.concat(registeredSongs);

            content.songs = arr;
            console.log("Added content");

            console.log(page.url());

            if (json.meta.next) {
                await page.evaluate("document.querySelector('a.active').parentNode.nextElementSibling.firstChild.click()");
            } else {
                const csv = await jsoncsv.json2csv(content.songs, {delimiter: {field: ';'}});

                fs.writeFileSync(`./logs/Sia ASCAP ${content.date}.csv`, csv);
                console.log('Wrote file to disk');

                resolve();
            }
        } while (true)
    } catch (e) {
        console.log('An error occurred', e);
        resolve();
    }
}

async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function init() {
    do {
        await new Promise(getData);
        process.exit();
    } while (true)
}

init();