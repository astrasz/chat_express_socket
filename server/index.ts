import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, '.env'), debug: true });

import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import sequelize from "./src/models";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(500).json({ message: err.message })
});

app.get('/', (req: Request, res: Response) => {
    res.send('Client have just been created');
});

console.log('sequ', sequelize.models);

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established');
        const server = app.listen(port, () => console.log(`Server is running on port: ${port}`));
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
    })
    .catch((err) => {
        console.log("Unable to connect to the database", err)
    })


// sequelize.sync();



