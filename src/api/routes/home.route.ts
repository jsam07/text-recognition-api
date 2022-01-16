import { Router } from 'express';

const path = '/';
const router = Router();

router.get(path, (req, res) => {
    res.status(200).send('Welcome to the Image Processing RESTful API');
});

export default router;
