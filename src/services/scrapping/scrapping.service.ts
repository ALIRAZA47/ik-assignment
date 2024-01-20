import { Types } from '../../types/types'
import HttpException from '../../utils/global/httpException'
import { HttpStatusCode } from 'axios'
import { Puppeteer } from '../../utils/puppeteer'

export class ScrappingService {
    private readonly puppeteerService = new Puppeteer()

    constructor() {
    // do nothing
    }

    async scrap(urls: string[]) {
        const contents: Types.Scrapping.Response[] = []
        try {
            for (const url of urls) {
                try {
                    const content = await this.puppeteerService.getContentsOfUrl(url, {
                        timeout: 1000 * 30, // 30 seconds
                    })
                    contents.push({
                        url,
                        success: true,
                        content,
                    })
                } catch (e) {
                    contents.push({
                        url,
                        success: false,
                    })
                }
            }
            return contents
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message ||
          'Something went wrong while getting contents of pages using URLs',
            )
        }
    }
}
