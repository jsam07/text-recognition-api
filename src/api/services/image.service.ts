/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import hljs from 'highlight.js';
import request from 'request';
import vision from '@google-cloud/vision';

import { logger } from '@utils/logger.util';

import {
    AZURE_API_KEY,
    AZURE_COGNITIVE_ENDPOINT,
    ENVIRONMENT,
    GOOGLE_API_CREDENTIALS,
    GOOGLE_API_CREDS,
} from '@utils/secrets.util';
import DatabaseException from '@errors/database.exception';

export default class ImageProcessingService {
    public static annotateImage = async (
        imagePath: string,
    ): Promise<string> => {
        try {
            // Creates a client
            let client;

            if (ENVIRONMENT === 'development') {
                client = new vision.ImageAnnotatorClient({
                    credentials: GOOGLE_API_CREDENTIALS,
                });
            } else {
                client = new vision.ImageAnnotatorClient();
            }

            // logger.warn(GOOGLE_APPLICATION_CREDENTIALS);
            // logger.warn(JSON.stringify());

            // Read a local image as a text document
            const [result] = await client.documentTextDetection(imagePath);
            const { fullTextAnnotation } = result;
            console.log(`Full text: \n\n${fullTextAnnotation.text}`);
            // fullTextAnnotation.pages.forEach(page => {
            //     page.blocks.forEach(block => {
            //         console.log(`Block confidence: ${block.confidence}`);
            //         block.paragraphs.forEach(paragraph => {
            //             console.log(
            //                 `Paragraph confidence: ${paragraph.confidence}`,
            //             );
            //             paragraph.words.forEach(word => {
            //                 const wordText = word.symbols
            //                     .map(s => s.text)
            //                     .join('');
            //                 console.log(`Word text: ${wordText}`);
            //                 console.log(`Word confidence: ${word.confidence}`);
            //                 word.symbols.forEach(symbol => {
            //                     console.log(`Symbol text: ${symbol.text}`);
            //                     console.log(
            //                         `Symbol confidence: ${symbol.confidence}`,
            //                     );
            //                 });
            //             });
            //         });
            //     });
            // });
            // const subscriptionKey = AZURE_API_KEY;
            // const endpoint = AZURE_COGNITIVE_ENDPOINT;

            // const uriBase = `${endpoint}vision/v3.1/ocr`;

            // const imageUrl = 'https://i.stack.imgur.com/XbmzZ.png';

            // // Request parameters.
            // const params = {
            //     language: 'unk',
            //     detectOrientation: 'true',
            // };

            // const options = {
            //     uri: uriBase,
            //     qs: params,
            //     // eslint-disable-next-line no-useless-concat
            //     body: `${'{"url": ' + '"'}${imageUrl}"}`,
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Ocp-Apim-Subscription-Key': subscriptionKey,
            //     },
            // };

            // request.post(options, (error, response, body) => {
            //     if (error) {
            //         console.log('Error: ', error);
            //         return;
            //     }
            //     const jsonResponse = JSON.stringify(
            //         JSON.parse(body),
            //         null,
            //         '  ',
            //     );
            //     console.log('JSON Response\n');
            //     console.log(jsonResponse);
            // });
            const lang = hljs.highlightAuto(fullTextAnnotation.text);
            // logger.warn(JSON.stringify(lang.secondBest, null, 4));
            return fullTextAnnotation?.text;
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('Annotate Image');
        }
    };
}
