import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule para *ngFor

@Component({
  selector: 'app-call-history',
  standalone: true, // Componente também é standalone
  imports: [CommonModule], // Adicione o CommonModule aqui
  templateUrl: './call-history.html',
  styleUrl: './call-history.scss'
})
export class CallHistory {
  // Use o @Input para receber o array do histórico
  @Input() historyData: any[] = []; 
}