import http from 'http';
import express from 'express';

import logging from './config/logging';
import config from './config/config';
import routes from './routes/route';

const NAMESPACE = "Server";
const router = express();

/*logging the request*/
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () =>{
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}] STATUS - [${req.statusCode}]`);
    })
    next();
})
// API rules
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
        
        return res.status(200).json({});
       
    } 
    next();
})
// Routes
router.use('/auth', routes);
// error handling middleware
router.use((req, res, next) =>{
    const error = new Error('not found');
    return res.status(404).json({ message: error.message})
})

// Define a server

const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server listening on ${config.server.hostname}: ${config.server.port}`))


