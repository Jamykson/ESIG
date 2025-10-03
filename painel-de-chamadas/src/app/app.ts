import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Importamos apenas os componentes que são realmente necessários para a lógica ou template
import { ClockComponent } from './components/clock/clock';
import { VideoPlayer } from './components/video-player/video-player';
import { CallDisplay } from './components/call-display/call-display';
import { CallHistory } from './components/call-history/call-history';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ClockComponent,
    VideoPlayer,
    CallDisplay,
    CallHistory
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
  }
  
  isCallActive = false;
  mockCalls = [
    { ticket: 'A001', name: 'João Carlos da Silva', desk: 'Guichê 01' },
    { ticket: 'B002', name: 'Maria Joaquina de Souza', desk: 'Guichê 03' },
    { ticket: 'A003', name: 'Marcio Pablo Alves', desk: 'Guichê 02' },
    { ticket: 'C004', name: 'Ana Beatriz Oliveira', desk: 'Guichê 01' },
    { ticket: 'B005', 'name': 'Lucas Cirilo Mendes', desk: 'Guichê 02' },
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