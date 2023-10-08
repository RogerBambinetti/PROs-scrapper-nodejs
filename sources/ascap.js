const puppeteer = require('puppeteer');
const utils = require('../utils/utils');

const url = "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I";

async function getData() {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

        const page = await browser.newPage();

        console.log('Navigating')
        await page.goto(url, { waitUntil: 'networkidle0' });

        const iframe = await page.$('.truste_popframe');
        const frameContent = await iframe.contentFrame();

        const button1 = await frameContent.$('.call');
        await button1.click()

        await utils.addDelay();

        const button2 = await page.$$('button');
        await button2[22].click();

        const button3 = await page.$$('button');
        await button3[20].click();

        await utils.addDelay();

        const button4 = await page.$('.c-card__body');
        await button4.click();

        let songs = []

        do {
            const response = await page.waitForResponse(response => response.url().includes('works'));
            const json = await response.json();

            const arr = songs.concat(json.result);
            songs = arr;

            console.log("Added content");
            console.log(page.url());

            if (json.meta.next) {
                await page.evaluate("document.querySelector('a.active').parentNode.nextElementSibling.firstChild.click()");
            } else {
                return songs;
            }
        } while (true)
    } catch (e) {
        console.log('An error occurred', e);
    }
}

async function getFormattedData() {
    const data = await getData();

    return data.map(d => {
        const creators = d.interestedParties.filter(p => p.roleCde == "W");
        const creatorsString = creators.map(p => p.fullName.trim()).sort().join(', ');

        return { ISWC: d.ISWCCde, workId: d.workId, title: d.workTitle, creators: creatorsString, source: 'ASCAP' }
    });
}

module.exports = { getFormattedData };