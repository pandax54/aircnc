// yarn tsc
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path'

// aula 05 socket.io 2:00
import socketio from 'socket.io';
import http from 'http';

// mongodb+srv://aircnc_admin:<password>@aircnc-up4sy.mongodb.net/<dbname>?retryWrites=true&w=majority

// put the password and the db name
mongoose.connect('mongodb+srv://aircnc_admin:aircnc_pass@aircnc-up4sy.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//import routes from './routes';
import cors from 'cors';

const app = express();
// WEB SOCKET 
const server = http.Server(app);
const io = socketio(server)

// aula 05 13:00
// redis -> feito para armazenar essas informações para aplicacoes em producao 
const connectedUsers = {};

// toda vez que usuário conectar, anotaremos aqui a informação de que o usuário está logado
io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuário conectado', socket.id);

    setTimeout(() => {
        socket.emit('message', 'World')
    }, 4000)

    socket.on('omni', data => {
        console.log(data)
    })

    const { user_id } = socket.handshake.query

    // relacionando o id do usuário com o id de conexão dele
    // aqui a chave será o número do id e nao a "user_id" literalmente
    connectedUsers[user_id] = socket.id
    // agora iremos tornar essa variável de usuários conectados disponível para toda a aplicação
    // por meio de um middleware abaixo
});

// aula 05 15:00
app.use((req, res, next) => {
    // io definido na linha 25
    req.io = io;
    req.connectedUsers = connectedUsers

    return next();
})


// especificar quem tem acesso à api
// app.use(cors({ origin: 'http://localhost:3333'}))
app.use(cors());
app.use(express.json());
// path - files 
app.use('/files', express.static(path.resolve(__dirname, "..", 'uploads')));
app.use(routes);


// app.listen(5000);

// dessa forma a aplicação está configurada para ouvir requisições http e websocket
server.listen(5000)