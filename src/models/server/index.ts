import express from 'express';
import cors from 'cors'
import { router } from "../../routes/index.routes";
class SERVER {
    private app: express.Application

    constructor(private PORT?: string | number) {
        this.app = express();
        this.expressSettings();
    }

    expressSettings = () => {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.set('port', Number(this.PORT) | 443);
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(router);
    }
    start = async () => {
        await this.app.listen(this.app.get('port'));
        console.log(`Server running on port ${this.app.get('port')}`);
    }
}

export { SERVER };