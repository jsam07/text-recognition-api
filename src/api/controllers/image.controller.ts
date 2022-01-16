import path from 'path';
import uuid from 'uuid';
import { promises as fs } from 'fs';
import { Request, Response, NextFunction } from 'express';

import ImageProcessingService from '@services/image.service';

export default class ImageProcessingController {
    public static handleAnnotateImage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            // eslint-disable-next-line prefer-const
            let { image, code } = req.body;
            let imagePath = '';

            if (code) {
                code = true;
            } else {
                code = false;
            }

            if (!image) {
                imagePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'public',
                    'img',
                    'test.jpg',
                );
                code = true;
            } else {
                const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
                imagePath = path.join(uploadsDir, `${uuid.v1()}`);
                await fs.writeFile(imagePath, image, { encoding: 'base64' });
            }

            const response = await ImageProcessingService.annotateImage(
                imagePath,
                code,
            );
            res.send(response);
        } catch (error) {
            next(error);
        }
    };
}
