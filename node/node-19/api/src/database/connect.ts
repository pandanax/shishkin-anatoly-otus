import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default {
     connect () {
        const db = process.env.DB_CONN_STRING;
        mongoose
            .connect(db)
            .then(() => {
                mongoose.connection.on('disconnected', this.connect);
                return console.info(`Successfully connected to ${db}`);

            })
            .catch(error => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    }
};
