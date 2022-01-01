import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser'
import router from './routes';
import path from 'path';
import https from 'https'
import { readFileSync } from 'fs';
import appConfig from './config/appConfig';
import cors from 'cors';
import { jsonPayload, notFound } from './utils/payloads';
const PORT = 8080;


const app = express();

app.use(cors())
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api", router);
app.use("*", (req, res) => {
    res.status(404).json(notFound);
})
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('CAUGHT ERROR', err);
    res.status(500).json(jsonPayload(false, "5xx_internal_server_error"));
});


https.createServer({
    key: readFileSync(path.join(__dirname, "key.pem")),
    cert: readFileSync(path.join(__dirname, "cert.pem")),
    passphrase: appConfig.sslPassphrase
}, app).listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
