import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // ou o caminho correto do seu template
  styleUrls: ['./app.component.css'], // ou o caminho correto do seu estilo
})
export class AppComponent {
  // Lista de histórico de chamadas
  callHistory = [];

  // Número máximo de chamadas visíveis no histórico
  maxCallsInHistory = 5;

  // Função para adicionar uma nova chamada ao histórico
  addNewCall(ticket: string, name: string, desk: string, time: string) {
    const newCall = { ticket, name, desk, time };
    
    // Adiciona a nova chamada ao histórico
    this.callHistory.push(newCall);
    
    // Limita o histórico ao número máximo de chamadas
    if (this.callHistory.length > this.maxCallsInHistory) {
      this.callHistory.shift(); // Remove o primeiro item (o mais antigo)
    }
  }

  // Simula a adição de uma nova chamada para fins de demonstração
  simulateNewCall() {
    const newTicket = `Ticket #${this.callHistory.length + 1}`;
    const newName = `Cliente ${this.callHistory.length + 1}`;
    const newDesk = `Guichê ${this.callHistory.length + 1}`;
    const newTime = new Date().toLocaleTimeString();

    this.addNewCall(newTicket, newName, newDesk, newTime);
  }
}
