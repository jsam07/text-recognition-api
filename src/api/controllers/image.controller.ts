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
            const { image } = req.body;
            let imagePath = '';

            if (!image) {
                imagePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'public',
                    'img',
                    'test.jpg',
                );
            } else {
                const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
                imagePath = path.join(uploadsDir, `${uuid.v1()}`);
                await fs.writeFile(imagePath, image, { encoding: 'base64' });
            }

            const response = await ImageProcessingService.annotateImage(
                imagePath,
            );
            res.json({ text: response });

            // console.log(image);
        } catch (error) {
            next(error);
        }
    };
}
