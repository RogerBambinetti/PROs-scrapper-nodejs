const cron = require('node-cron');
const puppeteer = require('puppeteer');
const fs = require('fs');

const ascap = {
    url: "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I"
}

let lastContent = require('./logs/Sia ASCAP 2023.7.30.json');

async function init() {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new' });

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

        page.on('response', async response => {
            if (response.url().includes('works')) {
                const json = await response.json();
                content.total = json.meta.totalCount;

                const registeredSongs = json.result.map(r => `${r.workId} ${r.workTitle}`);
                const arr = content.songs.concat(registeredSongs);

                content.songs = arr;
                console.log("Added content");
                if (json.meta.next) {
                    await page.evaluate("document.querySelector('a.active').parentNode.nextElementSibling.firstChild.click()");
                } else {
                    fs.writeFileSync(`./logs/Sia ASCAP ${content.date}.json`, JSON.stringify(content, null, 4));
                    console.log('Wrote file to disk');

                    if (lastContent && lastContent.total < content.total) {
                        console.log("Count change detected", lastContent.total, content.total);
                        const diff = content.songs.filter(song => !lastContent.songs.includes(song));

                        console.log("Detected diff:", diff)
                    }

                    lastContent = content;
                }
            }
        });

        const button4 = await page.$('.c-card__body');
        await button4.click();
    } catch (e) {
        console.log('An error occurred', e);
    }
}

async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}


cron.schedule('* * * * *', init);