import { Page } from 'puppeteer';
import BaseSource from '../BaseSource';

let currentPage = 1;

class BMI extends BaseSource {

    constructor() {
        super(process.env.URL_BMI as string);
    }

    async handleInitialActions(page: Page) {
        try {
            const button1 = await page.$('#btnAccept');
            await button1?.click();

            console.log('Handled initial actions');
        } catch (e) {
            console.log('Error handling initial actions:', e);
        }
    }

    async collectSongData(page: Page) {
        await page.waitForSelector('.pagination');

        let songs = []
        const totalspan = await page.$('.results-font');

        //@ts-ignore
        const total = await totalspan?.evaluate(x => parseInt(x.textContent.match(/\d/g).join('')));

        do {
            const articles = await page.$$('.result-list .result-row-small-browser');
            const result = [];

            for (const article of articles) {
                const title = await article.$('.song-title');

                const tds = await article.$$('td');
                const creators = [];

                const lis = await tds[3].$$('li');
                for (const li of lis) {
                    creators.push(await li.evaluate(x => x.textContent));
                }

                result.push({
                    title: await title?.evaluate(x => x.textContent),
                    ISWC: '',
                    workId: await tds[1].evaluate(x => x.textContent),
                    creators
                });
            }

            const arr: Array<any> = songs.concat(result);
            songs = arr;

            console.log("Added content", songs.length, "/", total);

            if (total && songs.length < total) {
                currentPage++;

                await this.navigateToPage(page, this.url.replace('currentPage', currentPage.toString()))
                await page.waitForSelector('.pagination');
            } else {
                return songs;
            }
        } while (true)
    }

}

export default BMI;