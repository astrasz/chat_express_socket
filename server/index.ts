import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, '.env'), debug: true });

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import db from './src/models/index';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Client have just been created');
});

const server = app.listen(port, () => console.log(`Server is running on port: ${port}`));

const connect = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established')
    } catch (error) {
        console.log("Unable to connect to the database", error);

    }
}
connect();


const io = new Server(server);
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg: string) => {
        io.emit('message', msg)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
