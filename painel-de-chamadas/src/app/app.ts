import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Componentes filhos usados no template
import { VideoPlayer } from './components/video-player/video-player';
import { CallDisplay } from './components/call-display/call-display';
import { CallHistory } from './components/call-history/call-history';
import { ClockComponent } from './components/clock/clock';

// Estrutura da chamada
interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string;
  time: string; // Agora sempre existe
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClockComponent, VideoPlayer, CallDisplay, CallHistory],
  providers: [DatePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  /** Dados mock para gerar chamadas aleatórias */
  private mockNames = [
    'JOÃO CARLOS DA SILVA',
    'MARIA JOAQUINA DE SOUZA',
    'MARCIO PABLO ALVES',
    'ANA BEATRIZ OLIVEIRA',
    'LUCAS CIRILO MENDES'
  ];
  private mockDesks = ['Guichê 01', 'Guichê 02', 'Guichê 03'];
  private mockSpecialties = ['Clínico Geral', 'Cardiologia', 'Ortopedia', 'Pediatria'];

  /** Prefixos e contadores por especialidade */
  private specialtyPrefixes = {
    'Clínico Geral': 'CG',
    'Cardiologia': 'CA',
    'Ortopedia': 'OR',
    'Pediatria': 'PE'
  };
  private ticketCounters = { CG: 1, CA: 1, OR: 1, PE: 1 };

  /** Estado da aplicação */
  public currentDate: string | null = '';
  public callHistory: Call[] = [];
  public currentCall: Call | null = null;
  public isCallActive = false;
  private callTimeout?: ReturnType<typeof setTimeout>;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    // Define a data formatada
    this.currentDate = this.datePipe.transform(new Date(), "EEEE, d 'de' MMMM", 'pt-BR');

    // Inicializa com uma chamada exemplo
    const initialCall: Call = {
      ticket: 'CG-001N',
      name: 'ANA BEATRIZ OLIVEIRA',
      desk: 'Guichê 01',
      specialty: 'Clínico Geral',
      time: this.getCurrentTime()
    };
    this.callHistory.push(initialCall);
    this.ticketCounters['CG']++;
  }

  /** Gera e exibe uma nova chamada */
  public simulateNewCall(): void {
    if (this.isCallActive) return;

    const specialty = this.randomItem(this.mockSpecialties);
    const name = this.randomItem(this.mockNames);
    const desk = this.randomItem(this.mockDesks);

    // Cria senha no formato XX-000N
    const prefix = this.specialtyPrefixes[specialty as keyof typeof this.specialtyPrefixes];
    const number = this.ticketCounters[prefix as keyof typeof this.ticketCounters]++;
    const ticket = `${prefix}-${number.toString().padStart(3, '0')}N`;

    const newCall: Call = { 
      ticket, 
      name, 
      desk, 
      specialty,
      time: this.getCurrentTime() // adiciona hora da chamada
    };

    // Atualiza estado
    this.currentCall = newCall;
    this.callHistory.unshift(this.currentCall);
    if (this.callHistory.length > 5) this.callHistory.pop(); // Mantém histórico curto

    this.isCallActive = true;

    // Chamada dura 15 segundos
    clearTimeout(this.callTimeout);
    this.callTimeout = setTimeout(() => (this.isCallActive = false), 15000);
  }

  /** Retorna hora atual no formato HH:mm */
  private getCurrentTime(): string {
    return this.datePipe.transform(new Date(), 'HH:mm') || '';
  }

  /** Retorna um item aleatório de um array */
  private randomItem<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }
}
