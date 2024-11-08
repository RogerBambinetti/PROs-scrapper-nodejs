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

    async findButtonByText(page, buttonText) {
        const buttons = await page.$$('button');

        for (const btn of buttons) {
            const btnText = await btn.evaluate(x => x.textContent);

            if (btnText.trim() == buttonText) {
                return btn;
            }
        }
    }

    async closeCookieBanner(page: Page) {
        return;
    }

    async handleAdditionalButtons(page: Page) {
        return;
    }

    async collectSongData(page: Page) {
        return [];
    }

    async getData() {
        const browser = await this.launchBrowser();
        const page = await browser.newPage();

        try {
            await this.navigateToPage(page, this.url);
            await this.closeCookieBanner(page);
            await this.handleAdditionalButtons(page);
            const songs = await this.collectSongData(page);

            return songs;
        } catch (e) {
            console.log('An error occurred during data retrieval:', e);
        } finally {
            await browser.close();
        }
    }

    async getFormattedData() {
        const data = await this.getData();

        return data;
    }
}