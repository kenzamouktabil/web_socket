import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
      this.socket = io('http://192.168.0.145:3000');
    
    }
      
  // Écouter les messages texte depuis le serveur
  onMessage(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.socket.on('message', (data: string) => {
        subscriber.next(data);
      });
    });
  }

  // Envoyer un message texte au serveur
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  // Écouter les fichiers depuis le serveur
  onFile(): Observable<{ name: string; data: string }> {
    return new Observable<{ name: string; data: string }>((subscriber) => {
      this.socket.on('file', (file: { name: string; data: string }) => {
        subscriber.next(file);
      });
    });
  }

  // Envoyer un fichier au serveur
  sendFile(file: { name: string; data: string }): void {
    this.socket.emit('file', file);
  }
  
}
