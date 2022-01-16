/* eslint-disable no-unused-expressions */
import fs from 'fs';
import dotenv from 'dotenv';
import IOHandler from '@utils/iohandler.util';
import { logger } from '@utils/logger.util';
import path from 'path';

if (IOHandler.dirExists('.env')) {
    logger.info('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.info(
        'Using .env.example file to supply config environment variables',
    );
    dotenv.config({ path: '.env.example' });
}

export const PORT = process.env.PORT || 3000;
export const { GOOGLE_API_KEY } = process.env;
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'service-account-file.json',
);

export const ENVIRONMENT = process.env.NODE_ENV || 'development';

// OCR/HCR API'S
export const { AZURE_API_KEY, AZURE_COGNITIVE_ENDPOINT } = process.env;
export const GOOGLE_API_CREDENTIALS = {
    type: process.env.GOOGLE_ACCOUNT_TYPE?.replace(/\n/gm, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID?.replace(/\n/gm, '\n'),
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID?.replace(/\n/gm, '\n'),
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\n/gm, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL?.replace(/\n/gm, '\n'),
    client_id: process.env.GOOGLE_CLIENT_ID?.replace(/\n/gm, '\n'),
    auth_uri: process.env.GOOGLE_AUTH_URI?.replace(/\n/gm, '\n'),
    token_uri: process.env.GOOGLE_TOKEN_URI?.replace(/\n/gm, '\n'),
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_CERT_URL?.replace(
        /\n/gm,
        '\n',
    ),
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL?.replace(
        /\n/gm,
        '\n',
    ),
};

if (process.env.GOOGLE_CREDENTIALS) {
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    fs.writeFileSync(
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
        JSON.stringify(GOOGLE_API_CREDENTIALS) || '',
    );
}

// "postinstall": "echo $GOOGLE_APPLICATION_CREDENTIALS > service-account-file.json",
