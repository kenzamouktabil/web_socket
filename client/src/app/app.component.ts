import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './app.component.html', // Lien vers le fichier HTML
  styleUrls: ['./app.component.css'],  // Lien vers le fichier CSS
})
export class AppComponent {}
