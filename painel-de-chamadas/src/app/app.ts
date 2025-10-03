import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Importar todos os componentes filhos usados no template
import { VideoPlayer } from './components/video-player/video-player';
import { CallDisplay } from './components/call-display/call-display';
import { CallHistory } from './components/call-history/call-history';
import { ClockComponent } from './components/clock/clock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    VideoPlayer,
    CallDisplay,
    CallHistory,
    ClockComponent
  ],
  providers: [DatePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  
  currentDate: string | null = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.currentDate = this.datePipe.transform(new Date(), "EEEE, d 'de' MMMM", 'pt-BR');

    // ATUALIZAÇÃO: Carrega 5 itens para ter 1 senha atual e 4 no histórico
    const initialHistory = this.mockCalls.slice(0, 5); 
    this.callHistory = initialHistory.reverse();
  }
  
  isCallActive = false;
  mockCalls = [
    { ticket: 'A001', name: 'João Carlos da Silva', desk: 'Guichê 01' },
    { ticket: 'B002', name: 'Maria Joaquina de Souza', desk: 'Guichê 03' },
    { ticket: 'A003', name: 'Marcio Pablo Alves', desk: 'Guichê 02' },
    { ticket: 'C004', name: 'Ana Beatriz Oliveira', desk: 'Guichê 01' },
    { ticket: 'B005', name: 'Lucas Cirilo Mendes', desk: 'Guichê 02' },
  ];
  currentCall: any = null;
  callHistory: any[] = [];

  simulateNewCall() {
    const randomIndex = Math.floor(Math.random() * this.mockCalls.length);
    this.currentCall = this.mockCalls[randomIndex];
    this.callHistory.unshift(this.currentCall);
    if (this.callHistory.length > 5) {
      this.callHistory.pop();
    }
    this.isCallActive = true;
    setTimeout(() => {
      this.isCallActive = false;
    }, 15000);
  }
}