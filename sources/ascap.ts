import { Page } from 'puppeteer';
import BaseSource from '../BaseSource';
import utils from '../utils/util';

class ASCAP extends BaseSource {

    constructor() {
        super("https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I");
    }

    async closeCookieBanner(page: Page) {
        try {
            const iframe = await page.waitForSelector('.truste_popframe');
            await utils.addDelay();

            if (!iframe) {
                return;
            }

            const frameContent = await iframe.contentFrame();

            if (!frameContent) {
                return;
            }

            const button = await frameContent.$('.call');

            if (button) {
                await button.click();
                console.log('Closed cookie banner');
            }
        } catch (e) {
            console.log('Cookie banner not found or error closing it:', e);
        }
    }

    async handleAdditionalButtons(page: Page) {
        try {
            await utils.addDelay();
            const button1 = await this.findButtonByText(page, 'I Agree');
            await button1?.click();

            await utils.addDelay();
            const button2 = await this.findButtonByText(page, 'Skip');
            await button2?.click();

            const mainContentButton = await page.$('.c-card__body');
            await mainContentButton?.click();

            console.log('Handled additional buttons');
        } catch (e) {
            console.log('Error clicking additional buttons:', e);
        }
    }

    async collectSongData(page: Page) {
        let songs: Array<object> = [];

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

        return songs;
    }

    async getFormattedData() {
        const data = await this.getData();

        return data.map((d: any) => {
            const creators = d.interestedParties.filter((p: any) => p.roleCde === "W");
            const creatorsString = creators.map((p: any) => p.fullName.trim()).sort().join(', ');

            return {
                ISWC: d.ISWCCde,
                workId: d.workId,
                title: d.workTitle,
                creators: creatorsString,
                source: 'ASCAP'
            };
        });
    }
}

export default ASCAP;