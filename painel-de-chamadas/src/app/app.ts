import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Componentes filhos
import { VideoPlayer } from './components/video-player/video-player';
import { CallDisplay } from './components/call-display/call-display';
import { CallHistory } from './components/call-history/call-history';
import { ClockComponent } from './components/clock/clock';

// Estrutura de dados para uma chamada
interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string;
  time: string;
}

/**
 * @Component AppComponent
 * @description Componente principal da aplicação que gerencia a exibição
 * e simulação de chamadas em um painel.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClockComponent, VideoPlayer, CallDisplay, CallHistory],
  providers: [DatePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {

  // ===================================================================
  // DADOS MOCK PARA SIMULAÇÃO
  // ===================================================================
  
  /** Nomes para gerar chamadas aleatórias. */
  private mockNames = [
    'JOÃO CARLOS DA SILVA', 'MARIA JOAQUINA DE SOUZA', 'MARCIO PABLO ALVES',
    'ANA BEATRIZ OLIVEIRA', 'LUCAS CIRILO MENDES'
  ];
  /** Guichês para gerar chamadas aleatórias. */
  private mockDesks = ['Guichê 1', 'Guichê 2', 'Guichê 3'];
  /** Especialidades para gerar chamadas aleatórias. */
  private mockSpecialties = ['Clínico Geral', 'Cardiologia', 'Ortopedia', 'Pediatria'];
  
  /** Mapeamento de especialidades para seus prefixos de senha. */
  private specialtyPrefixes = {
    'Clínico Geral': 'CG', 'Cardiologia': 'CA',
    'Ortopedia': 'OR', 'Pediatria': 'PE'
  };
  /** Contadores para garantir senhas sequenciais por especialidade. */
  private ticketCounters = { CG: 1, CA: 1, OR: 1, PE: 1 };

  // ===================================================================
  // CONFIGURAÇÃO & ESTADO DA APLICAÇÃO
  // ===================================================================

  /** O ID do vídeo do YouTube a ser reproduzido. */
  public youtubeVideoId = '1F--A5137-4';
  
  /** A data atual formatada para exibição no cabeçalho. */
  public currentDate: string | null = '';
  /** Lista das últimas 5 chamadas. A mais recente está no índice 0. */
  public callHistory: Call[] = [];
  /** A chamada que está atualmente em destaque (ativa). */
  public currentCall: Call | null = null;
  /** Flag que controla se a visualização de chamada ativa está visível. */
  public isCallActive = false;
  /** Referência ao timer da chamada ativa para poder cancelá-lo. */
  private callTimeout?: ReturnType<typeof setTimeout>;

  constructor(private datePipe: DatePipe) {}

  // ===================================================================
  // CICLO DE VIDA E INICIALIZAÇÃO
  // ===================================================================

  ngOnInit(): void {
    const formattedDate = this.datePipe.transform(new Date(), "EEEE, d 'de' MMMM", 'pt-BR');
    this.currentDate = this.capitalizeDateString(formattedDate || '');

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

  // ===================================================================
  // MÉTODOS PÚBLICOS (ACIONADOS PELO TEMPLATE)
  // ===================================================================

  /**
   * Simula a chegada de uma nova chamada.
   */
  public simulateNewCall(): void {
    if (this.isCallActive) return;

    const specialty = this.randomItem(this.mockSpecialties);
    const name = this.randomItem(this.mockNames);
    const desk = this.randomItem(this.mockDesks);

    const prefix = this.specialtyPrefixes[specialty as keyof typeof this.specialtyPrefixes];
    const number = this.ticketCounters[prefix as keyof typeof this.ticketCounters]++;
    const ticket = `${prefix}-${number.toString().padStart(3, '0')}N`;

    const newCall: Call = {
      ticket, name, desk, specialty,
      time: this.getCurrentTime()
    };
    
    // Atualiza o estado da aplicação
    this.currentCall = newCall;
    this.callHistory.unshift(this.currentCall);
    if (this.callHistory.length > 5) this.callHistory.pop();

    // Ativa a tela de chamada e agenda seu término
    this.isCallActive = true;
    clearTimeout(this.callTimeout);
    this.callTimeout = setTimeout(() => (this.isCallActive = false), 15000);
  }
  
  /**
   * Abrevia um nome completo para o formato "PrimeiraLetra. Sobrenome".
   * Ex: "JOÃO CARLOS DA SILVA" se torna "J. CARLOS".
   * @param fullName O nome completo a ser abreviado.
   * @returns O nome abreviado ou uma string vazia.
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

  /**
   * [NOVA FUNÇÃO]
   * Abrevia o nome de uma especialidade.
   * Ex: "Clínico Geral" -> "C. GERAL"
   * @param specialty A especialidade completa.
   * @returns A especialidade abreviada.
   */
  public abbreviateSpecialty(specialty: string | null | undefined): string {
    if (!specialty) {
      return '';
    }
    const words = specialty.trim().toUpperCase().split(' ');
    if (words.length === 1) {
      return specialty.toUpperCase();
    }
    const firstInitial = words[0].charAt(0);
    const secondWord = words[1];
    return `${firstInitial}. ${secondWord}`;
  }


  // ===================================================================
  // MÉTODOS PRIVADOS (AUXILIARES)
  // ===================================================================

  /**
   * Capitaliza a primeira letra de palavras importantes em uma string de data.
   */
  private capitalizeDateString(dateString: string): string {
    if (!dateString) return '';
    
    return dateString.split(' ').map(word => {
      if (['de'].includes(word)) {
        return word;
      }
      if (word.includes('-')) {
        return word.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  /**
   * Retorna a hora atual no formato HH:mm.
   */
  private getCurrentTime(): string {
    return this.datePipe.transform(new Date(), 'HH:mm') || '';
  }

  /**
   * Seleciona um item aleatório de um array genérico.
   */
  private randomItem<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }
}
