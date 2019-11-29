import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
// import * as controllers from './controllers';
import DemoController from './controllers/DemoController';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class DemoServer extends Server {
    private readonly SERVER_START_MSG = 'Demo server started on port: ';
    private readonly DEV_MSG = 'Express Server is running in development mode. ' +
        'No front-end content is being served.';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        const demoController = new DemoController();
        super.addControllers([demoController]);
        // Point to front-end code
        // if (process.env.NODE_ENV !== 'production') {
            // cinfo('Starting server in development mode');
        //     const msg = this.DEV_MSG + process.env.EXPRESS_PORT;
        //     this.app.get('*', (req, res) => res.send(msg));
        // }
        if (process.env.NODE_ENV !== 'production') {
            this.app.get('*', (req, res) => res.send(this.DEV_MSG));
        } else {
            this.serveFrontEndProd();
        }
    }
    private serveFrontEndProd(): void {
        const dir = path.join(__dirname, 'public/react/demo-react/');
        // Set the static and views directory
        this.app.set('views',  dir);
        this.app.use(express.static(dir));
        // Serve front-end content
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', {root: dir});
        });
    }
    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}

export default DemoServer;
