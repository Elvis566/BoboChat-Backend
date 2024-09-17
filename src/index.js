import express from 'express';
import bodyParse from 'body-parser'
import cors from 'cors';
import path from 'path'
import { Server } from 'socket.io';
import http from 'http'
import { sequelize } from './DB/conexion.js';


// importamos las rutas 
import { routerAvatar } from './routers/AvatarRouter.js';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

//configuaracion de la carpeta de imagenes como estatica
app. use('/images', express.static(path.join(__dirname, 'src/images')));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket)=> {
    console.log('Usuario conectado correctamente');

    socket.on('disconnect')
})
// configuaracion de los cors
app.use(cors());

// configuaracion para manejar datos en formato json
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}))


// Routes
app.use('/avatar',routerAvatar)

const conexion = async()=> {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: false});
        console.log('Run server');
        server.listen(port, ()=>{
            console.log('Server run in the port http://localhost:3000');
        })
    } catch (error) {
        console.log(error);
    }
}

conexion();

