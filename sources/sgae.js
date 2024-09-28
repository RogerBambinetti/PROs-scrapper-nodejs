const puppeteer = require('puppeteer');
const utils = require('../utils/util');

const url = "https://enlinea.sgae.es/RepertorioOnline/Disclaimer.aspx";

async function getData() {
    try {

        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], defaultViewport: { width: 1920, height: 1080 } });

        const page = await browser.newPage();

        console.log('Navigating')
        await page.goto(url, { waitUntil: 'networkidle0' });

        const button1 = await page.$('.boton_gradiente');
        await button1?.click();

        await page.waitForSelector('#pageSize');
        await page.select('#pageSize', '50');

        await page.evaluate("document.querySelector('#strCreatorName').value = 'FURLER SIA'");
        await page.evaluate("document.querySelector('.busqueda').click()");

        await page.waitForSelector('#tablaPaginacion');

        let songs = []
        const totalspan = await page.$('#strNumTotalReg');
        const total = await totalspan.evaluate(x => parseInt(x.textContent));

        do {
            const articles = await page.$$('#tablaObras tbody tr');
            const result = [];

            for (const article of articles) {
                const title = await (await article.$('.nombreObra')).evaluate(x => x.textContent);

                const workId = await (await article.$('.idObra')).evaluate(x => x.textContent);
                const creators = await (await article.$('.autor')).evaluate(x => x.textContent);

                result.push({
                    title: title,
                    ISWC: '',
                    workId: workId,
                    creators: [creators]
                });
            }

            const arr = songs.concat(result);
            songs = arr;

            console.log("Added content", songs.length, "/", total);

            if (songs.length < total) {
                await page.evaluate("document.querySelector('.active').parentNode.nextElementSibling.querySelector('a').click()");
                await page.waitForSelector('#tablaPaginacion');
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

        return { ISWC: d.ISWC, workId: workId, title: title, creators: creatorsString, source: 'SOCAN' }
    });
}

module.exports = { getFormattedData };