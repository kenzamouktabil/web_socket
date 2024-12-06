const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Permettre les connexions cross-origin

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200", // URL de l'application Angular
        methods: ["GET", "POST"]
    }
});

// Gérer les connexions WebSocket
io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    socket.on('message', (data) => {
        console.log('Message reçu : ', data);
        io.emit('message', data); // Diffuser le message à tous les clients
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebSocket en écoute sur http://localhost:${PORT}`);
});
