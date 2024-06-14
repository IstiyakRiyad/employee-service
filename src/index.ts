// Config 
import config from './config';


// Import data
import typeORM from './db/typeORM';
import app from './app';
import http from 'http';
import logger from './lib/logger';

async function start() {
    // DB Connections
    await typeORM.initialize();
    logger.info(`Postgres is connected`);

    
    const server = http.createServer(app).listen(config.PORT, () => {
        logger.info(`Server is running on port ${config.PORT}`);
    });

    server.setTimeout(5000000);
}



start()
.catch(error => {
    logger.error("Faild to start the server: ", error)
});
