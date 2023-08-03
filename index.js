const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');

const ascap = {
    url: "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I"
}

const latestLog = fs.readdirSync('./logs').pop();
let lastContent = require('./logs/' + latestLog);

async function getData(resolve) {
    try {

        setTimeout(resolve, 60 * 1000 * 3);

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

        page.on('response', async response => {
            if (response.url().includes('works')) {
                const json = await response.json();
                content.total = json.meta.totalCount;

                const registeredSongs = json.result.map(r => `${r.workId} ${r.workTitle}`);
                const arr = content.songs.concat(registeredSongs);

                content.songs = arr;
                console.log("Added content");
                
                console.log(page.url());

                if (json.meta.next) {
                    await page.evaluate("document.querySelector('a.active').parentNode.nextElementSibling.firstChild.click()");
                } else {
                    fs.writeFileSync(`./logs/Sia ASCAP ${content.date}.json`, JSON.stringify(content, null, 4));
                    console.log('Wrote file to disk');

                    if (lastContent && lastContent.total < content.total) {
                        console.log("Count change detected", lastContent.total, content.total);
                        const diff = content.songs.filter(song => !lastContent.songs.includes(song));

                        console.log("Detected diff:", diff);
                        //sendSMS(diff);
                    }

                    lastContent = content;

                    resolve();
                }
            }
        });
    } catch (e) {
        console.log('An error occurred', e);
        resolve();
    }
}

async function addDelay(seconds = 2) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

async function sendSMS(message) {
    console.log('Sending SMS');

    await axios.post('https://api-rest.zenvia.com/services/send-sms', {
        sendSmsRequest: {
            from: 'Song Tracker',
            to: '+5547988380999',
            msg: JSON.stringify(message),
            flashSms: false
        }
    }, { headers: { authorization: "Basic ZGV2b3ouc21zb25saW5lOklIQkNlVmZFRHo=" } });
}

async function init() {
    do {
        await new Promise(getData);
        process.exit();
    } while (true)
}

init();