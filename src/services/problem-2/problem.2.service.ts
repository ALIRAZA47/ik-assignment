import axios, { AxiosInstance } from 'axios'
import HttpException from '../../utils/global/httpException'
import { HttpStatusCode } from 'axios'
import { string } from 'joi'

export class Problem2Service {
    private reqInstance: AxiosInstance

    constructor() {
        this.reqInstance = axios.create({
            timeout: 1000 * 30,
        })
    }

    async callApiHandleExceptionsAndReturnResponse() {
        const url: string = 'https://jsonplaceholder.typicode.com/todos/1'
        try {
            const response = await this.reqInstance.get(url)
            return response.data
        } catch (e) {
            // if API call failed to connect to the API, throw an error with the status code and the error message
            if (e?.code === 'ECONNREFUSED' || e?.code === 'ENOTFOUND') {
                throw new HttpException(
                    HttpStatusCode.BadGateway,
                    'Error while connecting to the API',
                )
            }
            // if the API call fails, throw an error with the status code and the error message
            throw new HttpException(
                e?.response?.status || HttpStatusCode.BadGateway,
                e?.response?.statusMessage || e?.statusMessage || 'Failed to get todo',
            )
        }
    }
}
