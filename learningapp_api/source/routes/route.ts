import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.get('/login', controller.controlHealthCheck);

export = router;
