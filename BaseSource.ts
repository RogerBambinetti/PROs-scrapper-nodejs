import puppeteer, { Page } from 'puppeteer';

export default class BaseSoruce {

    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async launchBrowser() {
        console.log('Launching browser...');
        return puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    }

    async navigateToPage(page: Page, url: string) {
        console.log('Navigating to page...');
        await page.goto(url, { waitUntil: 'networkidle0' });
    }

    async findButtonByText(page: Page, buttonText: string) {
        const buttons = await page.$$('button');

        for (const btn of buttons) {
            const btnText = await btn.evaluate(x => x.textContent);

            if (btnText && btnText.trim() == buttonText) {
                return btn;
            }
        }
    }

    async handleInitialActions(page: Page): Promise<void> {
        return;
    }

    async collectSongData(page: Page): Promise<any> {
        return [];
    }

    async getData(): Promise<any> {
        const browser = await this.launchBrowser();
        const page = await browser.newPage();

        try {
            await this.navigateToPage(page, this.url);
            await this.handleInitialActions(page);
            const songs = await this.collectSongData(page);

            return songs;
        } catch (e) {
            console.log('An error occurred during data retrieval:', e);
        } finally {
            await browser.close();
        }
    }

    async getFormattedData(): Promise<Array<any>> {
        const data = await this.getData();

        return data.map((d: any) => {
            const title = d.title.split(']').pop().split('-')[0].trim();
            const workId = d.workId.split(']').pop().split('-').pop().trim();

            const creatorsString = d.creators.map((p: any) => p.trim()).sort().join(', ');

            return { ISWC: d.ISWC, workId: workId, title: title, creators: creatorsString, source: this.constructor.name }
        });
    }
}