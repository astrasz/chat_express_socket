import express from "express";
import dotenv from "dotenv"
import { Server } from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Client have just been created');
});

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
