import { Component, Input } from '@angular/core'; // 1. IMPORTE o Input
import { CommonModule } from '@angular/common'; // 2. IMPORTE o CommonModule para usar *ngIf

@Component({
  selector: 'app-call-display',
  standalone: true, // Componentes modernos são standalone
  imports: [CommonModule], // 3. ADICIONE o CommonModule aqui
  templateUrl: './call-display.html',
  styleUrl: './call-display.scss'
})
export class CallDisplay {
  // 4. DECLARE a propriedade que vai receber os dados
  @Input() callData: any; 
}