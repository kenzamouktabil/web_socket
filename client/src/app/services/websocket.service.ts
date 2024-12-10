import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // URL serveur WebSocket
  }

  // Écouter les messages depuis le serveur
  onMessage(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.socket.on('message', (data: string) => {
        subscriber.next(data);
      });
    });
  }

  // Envoyer un message au serveur
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
}
