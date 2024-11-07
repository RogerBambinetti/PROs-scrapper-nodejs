const puppeteer = require('puppeteer');
const utils = require('../utils/util');

const url = "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I";

async function launchBrowser() {
    console.log('Launching browser...');
    return puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
}

async function navigateToPage(page) {
    console.log('Navigating to page...');
    await page.goto(url, { waitUntil: 'networkidle0' });
}

async function closeCookieBanner(page) {
    try {
        const iframe = await page.waitForSelector('.truste_popframe');
        await utils.addDelay();

        const frameContent = await iframe.contentFrame();
        const button = await frameContent.$('.call');

        if (button) {
            await button.click();
            console.log('Closed cookie banner');
        }
    } catch (e) {
        console.log('Cookie banner not found or error closing it:', e);
    }
}

async function findButtonByText(page, buttonText) {
    const buttons = await page.$$('button');

    for (const btn of buttons) {
        const btnText = await btn.evaluate(x => x.textContent);

        if (btnText.trim() == buttonText) {
            return btn;
        }
    }
}

async function handleAdditionalButtons(page) {
    try {

        const button1 = await findButtonByText(page, 'I Agree');
        await button1?.click();

        const button2 = await findButtonByText(page, 'Skip');
        await button2?.click();

        await page.waitForSelector('.c-card__body');
        const mainContentButton = await page.$('.c-card__body');
        await mainContentButton?.click();

        console.log('Handled additional buttons');
    } catch (e) {
        console.log('Error clicking additional buttons:', e);
    }
}

async function collectSongData(page) {
    let songs = [];

    do {
        try {
            const response = await page.waitForResponse(response =>
                response.url().includes('works') && response.request().method() !== "OPTIONS"
            );
            const json = await response.json();
            songs = songs.concat(json.result);

            console.log("Added content from response");

            if (json.meta.next) {
                await page.evaluate(() => {
                    const nextButton = document.querySelector('a.active').parentNode.nextElementSibling.firstChild;
                    if (nextButton) nextButton.click();
                });
            } else {
                break;
            }
        } catch (e) {
            console.log('Error fetching song data:', e);
            break;
        }
    } while (true);

    return songs;
}

async function getData() {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    try {
        await navigateToPage(page);
        await closeCookieBanner(page);
        await utils.addDelay();
        await handleAdditionalButtons(page);
        await page.screenshot({ path: './print.png' })
        const songs = await collectSongData(page);
        return songs;
    } catch (e) {
        console.log('An error occurred during data retrieval:', e);
    } finally {
        await browser.close();
    }
}

async function getFormattedData() {
    const data = await getData();

    return data.map(d => {
        const creators = d.interestedParties.filter(p => p.roleCde === "W");
        const creatorsString = creators.map(p => p.fullName.trim()).sort().join(', ');

        return {
            ISWC: d.ISWCCde,
            workId: d.workId,
            title: d.workTitle,
            creators: creatorsString,
            source: 'ASCAP'
        };
    });
}

module.exports = { getFormattedData }