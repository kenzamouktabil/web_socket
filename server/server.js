const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); 

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // avant c etait l'URL  Angular
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]

    }
});


// Le serveur écoute sur le port 3000 et sur toutes les interfaces réseau
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur lancé sur http://0.0.0.0:${PORT}`);
});


io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');


    socket.on('message', (data) => {
        console.log('Message reçu : ', data);
        io.emit('message', data); // Diffuser le message à tous les clients
    });

     // Gérer l'envoi de fichier(ou audio)
     socket.on('file', (fileData) => {
        console.log('Fichier reçu : ', fileData.name);
        io.emit('file', fileData); // Diffuser le fichier à tous les clients
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });


});





