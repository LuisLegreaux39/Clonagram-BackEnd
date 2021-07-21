import mongoose from 'mongoose';
import { config } from 'dotenv';

class DATA_BASE {

    private mongoDbUser: string;
    private mongoDataBase: string;
    private mongoDbPassword: string;
    private stringConnection: string;

    constructor() {
        // DotEnv configuration
        config();
        //Mongo data class attributes
        this.stringConnection = `mongodb+srv://luis:${process.env.DOTENV_DB_PASSWORD}@cluster0.3genc.mongodb.net/${process.env.DOTENV_DB_NAME}?retryWrites=true&w=majority`;
        this.mongoDbUser = String(process.env.DOTENV_DB_USER);
        this.mongoDataBase = String(process.env.DOTENV_DB_NAME)
        this.mongoDbPassword = String(process.env.DOTENV_DB_PASSWORD);

    }
    // Initiating Mongo service
    start = async () => {
        mongoose.connect(this.stringConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.connectionSuccess()
        this.connectionError()
    }
    // Handling errors and success connection
    connectionError = () => {
        mongoose.connection.on('error', (err) => {
            if (err) {
                console.log(`Error connecting to data base ===> ${this.mongoDataBase}`)
            }
        })
    }
    connectionSuccess = () => {
        mongoose.connection.on('connected', (err) => {
            console.log(`Connected to data base ${this.mongoDataBase}`)
        })
    }

}


export {
    DATA_BASE
}