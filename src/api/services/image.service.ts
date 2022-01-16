/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import _ from 'lodash';
import beautify from 'js-beautify';
import detectLang from 'lang-detector';
import vision from '@google-cloud/vision';
import LanguageDetect from 'languagedetect';

import { logger } from '@utils/logger.util';

import { ENVIRONMENT, GOOGLE_API_CREDENTIALS } from '@utils/secrets.util';
import DatabaseException from '@errors/database.exception';

export default class ImageProcessingService {
    public static annotateImage = async (
        imagePath: string,
        isCode = true,
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

            // Extract Text
            const [result] = await client.documentTextDetection(imagePath);
            const { fullTextAnnotation } = result;
            const textCode = fullTextAnnotation?.text;
            console.log(`Full text: \n\n${textCode}`);

            if (isCode) {
                const lang =
                    ImageProcessingService.detectCodeLanguage(textCode);
                return {
                    lang,
                    text: ImageProcessingService.beautifyCode(lang, textCode),
                };
            }
            return {
                lang: ImageProcessingService.detectTextLanguage(textCode),
                text: textCode,
            };
        } catch (error) {
            logger.error(error);
            throw new DatabaseException('Annotate Image');
        }
    };

    public static beautifyCode = (lang: string, code: string): string => {
        try {
            switch (lang) {
                case 'JavaScript': {
                    return beautify.js(code, {
                        indent_size: 2,
                        space_in_empty_paren: true,
                    });
                }

                default:
                    return code;
            }
        } catch (error) {
            logger.error(error);
            return code;
        }
    };

    public static detectCodeLanguage = (code: string): string => {
        try {
            return detectLang(code);
        } catch (error) {
            logger.error(error);
            return 'Unknown';
        }
    };

    public static detectTextLanguage = (text: string): string => {
        try {
            const lngDetector = new LanguageDetect();
            return _.upperFirst(lngDetector.detect(text)[0][0]);
        } catch (error) {
            logger.error(error);
            return 'Unknown';
        }
    };
}
