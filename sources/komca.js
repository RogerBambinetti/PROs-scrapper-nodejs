const puppeteer = require('puppeteer');
const utils = require('../utils/util');

const url = "https://www.komca.or.kr/foreign2/eng/S01.jsp";

async function getData() {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

        const page = await browser.newPage();

        console.log('Navigating')
        await page.goto(url, { waitUntil: 'networkidle0' });

        const button1 = await page.$$('#foreign');
        await button1[0].click();

        await page.type('#author', 'FURLER SIA');
        await page.keyboard.press('Enter');
        await page.waitForNavigation();

        let songs = []
        const totalspan = await page.$('.result_total span');
        const total = await totalspan.evaluate(x => parseInt(x.textContent));

        do {
            const articles = await page.$$('.result_article');
            const result = [];

            for (const article of articles) {
                const title = await article.$('.tit2');
                const ISWC = await article.$('.metadata span');
                const creators = [];

                const tds = await article.$$('td');

                for (let i = 0; i < tds.length; i++) {
                    const text = await tds[i].evaluate(x => x.textContent);

                    if (text === 'CA' || text === 'C') {
                        const nextText = await tds[i + 1].evaluate(x => x.textContent);
                        creators.push(nextText);
                    }
                }

                result.push({
                    title: await title.evaluate(x => x.textContent),
                    ISWC: await ISWC.evaluate(x => x.textContent),
                    creators
                });
            }

            const arr = songs.concat(result);
            songs = arr;

            console.log("Added content", songs.length, "/", total);

            if (songs.length !== total) {
                if (await page.evaluate("document.querySelector('a strong').parentElement.nextElementSibling")) {
                    await page.evaluate("document.querySelector('a strong').parentElement.nextElementSibling.click()")
                } else {
                    await page.evaluate("document.querySelector('.direction.next').click()");
                }

                await page.waitForSelector('.pagination');
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
        const workId = d.title.split(']').pop().split('-').pop().trim();

        const creatorsString = d.creators.map(p => p.trim()).sort().join(', ');

        return { ISWC: d.ISWC, workId: workId, title: title, creators: creatorsString, source: 'KOMCA' }
    });
}

module.exports = { getFormattedData };