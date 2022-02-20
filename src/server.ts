import express, { Request, Response } from 'express'
import cors from 'cors'
import Helmet from "helmet"
import bodyParser from 'body-parser'
import Logger from "./helpers/logger"
import environment from "./environment"
import errorMiddleware from "./middlewares/error-middleware";
import morganMiddleware from "./middlewares/morgan-middleware";
import {createServer} from "http";
import {hostname, networkInterfaces} from "os";
import userRouter from './routers/UserRouter';
import productRouter from './routers/ProductRouter';
import categoryRouter from './routers/CategoryRouter';
import orderRouter from './routers/OrderRouter'

const app: express.Application = express()
const server = createServer(app);

/** Security and config **/
app.use(Helmet()); // Add security configuring HTTP headers appropriately
app.use(cors()); // Enable cors
app.use(bodyParser.json())

/** Middlewares **/
app.use(morganMiddleware); // Print http logs in development mode

/** Handlers **/
app.use(errorMiddleware); // Error handler
process.on('unhandledRejection', (error: Error) => { // Unhandled error handler
    Logger.error(`[unhandledRejection] ${error.stack}`);
});

userRouter(app);
productRouter(app);
categoryRouter(app);
orderRouter(app);


/** Listen on provided port, on all network interfaces. **/
server.listen(environment.port, async (): Promise<void> => {
    const ip = environment.isProduction() ? Object.values(networkInterfaces()).flat().find(details => details && details.family == 'IPv4' && !details.internal)?.address : '127.0.0.1';
    Logger.info(`⚡ ${environment.appName} Server Running here -> ${ip ?? hostname()}:${environment.port}`);
});

export default app;