import { Page } from 'puppeteer';
import BaseSource from '../BaseSource';

class KOMCA extends BaseSource {

    constructor() {
        super(process.env.URL_KOMCA as string);
    }

    async handleInitialActions(page: Page) {
        try {
            const button1 = await page.$$('#foreign');
            await button1[0]?.click();

            await page.type('#author', process.env.SEARCH_KEYWORDS as string);
            await page.keyboard.press('Enter');
            await page.waitForNavigation();

            console.log('Handled initial actions');
        } catch (e) {
            console.log('Error handling initial actions:', e);
        }
    }

    async collectSongData(page: Page) {
        let songs: Array<object> = []
        const totalspan = await page.$('.result_total span');
        const total = totalspan ? await totalspan.evaluate(x => parseInt(x.textContent || '0')) : 0;

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
                    title: await title?.evaluate(x => x.textContent),
                    ISWC: await ISWC?.evaluate(x => x.textContent),
                    workId: '',
                    creators
                });
            }

            const arr: Array<object> = songs.concat(result);
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
    }

}

export default KOMCA;