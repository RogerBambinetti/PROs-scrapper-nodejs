const puppeteer = require('puppeteer');
const utils = require('../utils/util');

const url = "https://repertoire.bmi.com/Search/Search?Main_Search_Text=FURLER%20SIA&Main_Search=Catalog&Search_Type=all&View_Count=100&Page_Number=1&Part_Type=WriterList&Part_Id=LSsWSgd%252bHiOth6NNjQIKUQ%253d%253d&Part_Id_Sub=YO0HedHMatLb45JzS23DVw%253d%253d&Part_Cae=Pm9DHKQ%252buxzCK2UKlQEHCA%253d%253d&Original_Search=Writer%2FComposer";

async function getData() {
    try {

        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

        const page = await browser.newPage();

        console.log('Navigating')
        await page.goto(url, { waitUntil: 'networkidle0' });

        const button1 = await page.$$('#btnAccept');

        if (button1) {
            await button1[0].click();
        }

        await page.waitForSelector('.results-font');
        await page.evaluate("document.scrollingElement.scrollBy(0, 100 * 100 * 100)");

        let songs = []
        const totalspan = await page.$('.results-font');
        const total = await totalspan.evaluate(x => parseInt(x.textContent.match(/\d/g).join('')));

        do {
            const articles = await page.$$('.result-list .result-row-small-browser');
            const result = [];

            for (const article of articles) {
                const title = await article.$('.song-title');

                const tds = await article.$$('td');
                const creators = [];

                result.push({
                    title: await title.evaluate(x => x.textContent),
                    ISWC: '',
                    workId: await tds[1].evaluate(x => x.textContent),
                    creators
                });
            }

            const arr = songs.concat(result);
            songs = arr;

            console.log("Added content", songs.length, "/", total);

            if (songs.length < total) {
                await page.evaluate("document.scrollingElement.scrollBy(0, 100 * 100 * 100)");
                await utils.addDelay();
                await page.evaluate("document.querySelector('.pagination .current').nextElementSibling.click()")
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
        const title = d.title.split(']').pop().split('-')[0].trim();
        const workId = d.workId.split(']').pop().split('-').pop().trim();

        const creatorsString = d.creators.map(p => p.trim()).sort().join(', ');

        return { ISWC: d.ISWC, workId: workId, title: title, creators: creatorsString, source: 'BMI' }
    });
}

module.exports = { getFormattedData };