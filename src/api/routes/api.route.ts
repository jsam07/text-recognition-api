import { Router } from 'express';

import ImageProcessingController from '@controllers/image.controller';

const router = Router();

// GET: http://localhost:3000/api/annotate
router.get('/api/annotate', ImageProcessingController.handleAnnotateImage);

// POST: http://localhost:3000/api/annotate
router.post('/api/annotate', ImageProcessingController.handleAnnotateImage);

export default router;
