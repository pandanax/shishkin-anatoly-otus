import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata"
import * as http from "http";
import express, { Express } from "express";
import bodyParser from "body-parser";

import database from './database/connect';
import './container'
import  Routes  from './routes'

dotenv.config();

export class Server {
    private readonly _app: Express;

    get app(): Express {
        return this._app;
    }

    private _server!: http.Server;

    get server(): http.Server {
        return this._server;
    }

    constructor() {
        this._app = express();

        this._app.set("port", process.env.PORT || 8080);

        this.configureMiddleware();
    }

    public configureMiddleware() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(cors());

        const routes = new Routes(this._app);
        routes.register();
    }

    public start() {
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log("🚀 Server is running on port " + this._app.get("port"));
            database.connect();
        });
    }
}

export default Server;
