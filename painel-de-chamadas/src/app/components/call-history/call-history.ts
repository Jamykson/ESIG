import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos a interface 'Call' para que o componente saiba a estrutura dos dados
interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string;
}

@Component({
  selector: 'app-call-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-history.html',
  styleUrls: ['./call-history.scss']
})
export class CallHistory {
  @Input() historyData: Call[] = [];

  /**
   * ESTA É A FUNÇÃO QUE ESTAVA EM FALTA
   * ------------------------------------
   * Ela recebe um nome completo (ex: "MARCIO PABLO ALVES") e o transforma
   * no formato abreviado (ex: "M. Pablo").
   */
  public abbreviateName(fullName: string): string {
    if (!fullName) {
      return '';
    }

    const parts = fullName.trim().split(' ');
    if (parts.length < 2) {
      // Se tiver só um nome, retorna esse nome
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    }

    const firstNameInitial = parts[0].charAt(0).toUpperCase();
    const secondName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();

    return `${firstNameInitial}. ${secondName}`;
  }
}