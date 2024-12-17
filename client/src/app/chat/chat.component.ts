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
  messages: { type: string; content: string; name?: string }[] = []; // Liste des messages
  message: string = '';
  selectedFile: File | null = null;

  // Variables pour l'enregistrement audio
  audioBlob: Blob | null = null;
  mediaRecorder: MediaRecorder | null = null;
  audioUrl: string | null = null;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Écouter les messages texte
    this.websocketService.onMessage().subscribe((msg) => {
      this.messages.push({ type: 'text', content: msg });
    });

    // Écouter les fichiers (inclut audio)
    this.websocketService.onFile().subscribe((file) => {
      const fileType = file.name.endsWith('.webm') ? 'audio' : 'file';
      this.messages.push({ type: fileType, content: file.data, name: file.name });
    });
  }

  // Envoyer un message texte ou fichier ou audio
  sendMessage(): void {
    // Vérification et envoi d'un message texte
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.message = ''; // Réinitialiser le champ message
    }
  
    // Vérification et envoi d'un fichier
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          name: this.selectedFile!.name,
          data: reader.result as string,
        };
        this.websocketService.sendFile(fileData);
        this.selectedFile = null; // Réinitialiser le fichier sélectionné
      };
      reader.readAsDataURL(this.selectedFile);
    }
  
    // Vérification et envoi de l'audio
    if (this.audioBlob) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          name: `audio_${Date.now()}.webm`,
          data: reader.result as string,
        };
        this.websocketService.sendFile(fileData);
        this.audioBlob = null; // Réinitialiser l'audio
        this.audioUrl = null;
      };
      reader.readAsDataURL(this.audioBlob);
    }
  }
  

  // Gérer la sélection de fichiers
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Démarrer l'enregistrement audio
  startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      this.mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        console.log('Audio enregistré !');
      };

      this.mediaRecorder.start();
      console.log('Enregistrement démarré...');
    });
  }

  // Arrêter l'enregistrement audio
  stopRecording(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      console.log('Enregistrement arrêté.');
    }
  }
}
