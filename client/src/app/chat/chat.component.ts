import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html', 
  styleUrls: ['./chat.component.css'],  
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  message: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Écouter les messages du serveur
    this.websocketService.onMessage().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  // Envoyer un message
  sendMessage(): void {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.message = ''; // Réinitialiser le champ de saisie
    }
  }
}
