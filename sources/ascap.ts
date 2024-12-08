import { Page } from 'puppeteer';
import BaseSource from '../BaseSource';
import utils from '../utils/util';

class ASCAP extends BaseSource {

    constructor() {
        super(process.env.URL_ASCAP as string);
    }

    async closeCookieBanner(page: Page) {
        try {
            const iframe = await page.waitForSelector('.truste_popframe');
            await utils.addDelay();

            const frameContent = await iframe?.contentFrame();
            const button = await frameContent?.$('.call');

            if (button) {
                await button.click();
                console.log('Closed cookie banner');
            }
        } catch (e) {
            console.log('Cookie banner not found or error closing it:', e);
        }
    }

    async handleInitialActions(page: Page) {
        try {

            await this.closeCookieBanner(page);

            await utils.addDelay();
            const button1 = await this.findButtonByText(page, 'I Agree');
            await button1?.click();

            await utils.addDelay();
            const button2 = await this.findButtonByText(page, 'Skip');
            await button2?.click();

            await utils.addDelay();
            const mainContentButton = await page.$('.c-card__body');
            await mainContentButton?.click();

            console.log('Handled initial actions');
        } catch (e) {
            console.log('Error handling initial actions:', e);
        }
    }

    async collectSongData(page: Page) {
        let songs: Array<object> = [];
        await page.screenshot({ path: 'screenshot.png' });
        do {
            try {
                const response = await page.waitForResponse(response =>
                    response.url().includes('works') && response.request().method() !== "OPTIONS"
                );
                const json = await response.json();
                songs = songs.concat(json.result);

                console.log("Added content from response");

                if (json.meta.next) {
                    await page.evaluate("document.querySelector('a.active').parentNode.nextElementSibling.firstChild.click()");
                } else {
                    break;
                }
            } catch (e) {
                console.log('Error fetching song data:', e);
                break;
            }
        } while (true);

        return songs.map((song: any) => {
            return {
                ISWC: song['ISWCCde'],
                workId: song['workId'].toString(),
                title: song['workTitle'],
                creators: song.interestedParties.filter((p: any) => p.roleCde === "W").map((p: any) => p.fullName)
            };
        });
    }
}

export default ASCAP;