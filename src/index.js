import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http'

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket)=> {
    console.log('Usuario conectado correctamente');

    socket.on('disconnect')
})

app.use(cors());
app.get('/', (req, res)=>{
    res.send('hello')
})

server.listen(port, ()=>{
    console.log('Server run in the port http://localhost:3000');
})

