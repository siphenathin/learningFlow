import {ConnectionOptions} from 'typeorm';
import path from 'path';

const isCompiled = path.extname(__filename).includes('js');

export default {
    type: "postgres",
    host: process.env.DB_HOST || 'localst',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT): '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: !process.env.DB_NAME || '',
    synchronize: !process.env.DB_NO_SYNC,
    logging: !process.env.DB_NO_LOGS,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval:2000,
    entinties: [
        `source/entities/**/*.${isCompiled ? 'js' : 'ts'}`
    ],
    migration:[
        `source/migration/**/*.${isCompiled ? 'js' : 'ts'}`
    ],
    cli:{
        "entitiesDir": "source/entitiesr",
        "migrationDir": "source/migration",
    }
} as ConnectionOptions;