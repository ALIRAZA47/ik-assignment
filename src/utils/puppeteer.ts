import { Browser, launch, BrowserConnectOptions } from 'puppeteer'
import { Logger, NamespacedLogger } from './logger'

export interface PuppeteerGetContentsOfUrlOptions {
  timeout?: number
}

export class Puppeteer {
    private readonly Logger = NamespacedLogger('Puppeteer')

    async getContentsOfUrl(
        url: string,
        options?: PuppeteerGetContentsOfUrlOptions,
    ) {
        let browser: Browser = null
        try {
            browser = await launch({
                headless: 'new',
                args: ['--no-sandbox'],
                ...(options && options),
            })
            const page = await browser.newPage()
            await page.goto(url, {
                timeout: options?.timeout || 30000,
            })
            const content = await page.content()
            await browser.close()
            return content
        } catch (e) {
            Logger.error(e.message)
            throw e
        } finally {
            if (browser) {
                await browser.close()
            }
        }
    }
}
