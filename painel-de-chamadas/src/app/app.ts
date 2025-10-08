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
  private mockDesks = ['Guichê 1', 'Guichê 2', 'Guichê 3'];
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
    // =====> CÓDIGO DA DATA ATUALIZADO AQUI <=====
    // Pega a data formatada em minúsculas
    const formattedDate = this.datePipe.transform(new Date(), "EEEE, d 'de' MMMM", 'pt-BR');
    // Aplica nossa função de capitalização e salva na variável que vai para a tela
    this.currentDate = this.capitalizeDateString(formattedDate || '');

    // Inicializa com uma chamada exemplo
    const initialCall: Call = {
      ticket: 'CG-001N',
      name: 'ANA BEATRIZ OLIVEIRA',
      desk: 'Guichê 1',
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
      time: this.getCurrentTime()
    };

    // Atualiza estado
    this.currentCall = newCall;
    this.callHistory.unshift(this.currentCall);
    if (this.callHistory.length > 5) this.callHistory.pop();

    this.isCallActive = true;

    // Chamada dura 15 segundos
    clearTimeout(this.callTimeout);
    this.callTimeout = setTimeout(() => (this.isCallActive = false), 15000);
  }
  
  /**
   * Abrevia um nome completo para o formato "I. Nome".
   * @param fullName O nome completo a ser abreviado.
   * @returns O nome abreviado.
   */
  public abbreviateName(fullName: string | null | undefined): string {
    if (!fullName) {
      return '';
    }
    const names = fullName.trim().split(' ');
    if (names.length <= 1) {
      return fullName;
    }
    const firstInitial = names[0].charAt(0).toUpperCase();
    const secondName = names[1];
    return `${firstInitial}. ${secondName}`;
  }

  // =====> NOVA FUNÇÃO ADICIONADA AQUI <=====
  /**
   * Capitaliza a primeira letra do dia da semana e do mês em uma string de data.
   * Também capitaliza o 'F' de '-Feira'.
   * @param dateString A string de data formatada (ex: 'quarta-feira, 8 de outubro').
   * @returns A string de data com as letras maiúsculas ajustadas.
   */
  private capitalizeDateString(dateString: string): string {
    if (!dateString) {
      return '';
    }
    // Divide a string em palavras
    return dateString.split(' ').map(word => {
      // Se a palavra for 'de', não faz nada
      if (['de'].includes(word)) {
        return word;
      }
      // Se for um dia da semana (contém '-'), capitaliza ambas as partes
      if (word.includes('-')) {
        return word.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
      }
      // Para as outras palavras (como o mês), capitaliza apenas a primeira letra
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
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