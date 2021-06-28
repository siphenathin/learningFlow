import {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Controller'

const controlHealthCheck = (req: Request, res: Response, next: NextFunction) =>{
    logging.info(NAMESPACE, `route called. `);
    return res.status(200).json({
        message: 'pond'
    });
}

export default {controlHealthCheck}
