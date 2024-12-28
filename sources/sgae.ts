import { Page } from 'puppeteer';
import BaseSource from '../BaseSource';

class SGAE extends BaseSource {

    constructor() {
        super(process.env.URL_SGAE as string);
    }

    async handleInitialActions(page: Page) {
        try {
            const button1 = await page.$('.boton_gradiente');
            await button1?.click();

            await page.waitForSelector('#pageSize');
            await page.select('#pageSize', '50');

            await page.evaluate(`document.querySelector('#strCreatorName').value = '${process.env.SEARCH_KEYWORDS}'`);
            await page.evaluate("document.querySelector('.busqueda').click()");

            await page.waitForSelector('#tablaPaginacion');

            console.log('Handled initial actions');
        } catch (e) {
            console.log('Error handling initial actions:', e);
        }
    }

    async collectSongData(page: Page) {
        let songs: Array<object> = []
        const totalspan = await page.$('#strNumTotalReg');

        //@ts-ignore
        const total = await totalspan.evaluate(x => parseInt(x.textContent));

        do {
            const articles = await page.$$('#tablaObras tbody tr');
            const result = [];

            for (const article of articles) {
                const titleElement = await article.$('.nombreObra');
                const title = titleElement ? await titleElement.evaluate(x => x.textContent) : null;

                const workIdElement = await article.$('.idObra');
                const workId = workIdElement ? await workIdElement.evaluate(x => x.textContent) : null;

                const creatorsElement = await article.$('.autor');
                const creators = creatorsElement ? await creatorsElement.evaluate(x => x.textContent) : null;

                result.push({
                    title: title,
                    ISWC: '',
                    workId: workId,
                    creators: [creators]
                });
            }

            const arr: Array<object> = songs.concat(result);
            songs = arr;

            console.log("Added content", songs.length, "/", total);

            if (songs.length < total) {
                await page.evaluate("document.querySelector('.active').parentNode.nextElementSibling.querySelector('a').click()");
                await page.waitForSelector('#tablaPaginacion');
            } else {
                return songs;
            }
        } while (true)
    }

}

export default SGAE;