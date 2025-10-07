import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Importar todos os componentes filhos usados no template
import { VideoPlayer } from './components/video-player/video-player';
import { CallDisplay } from './components/call-display/call-display';
import { CallHistory } from './components/call-history/call-history';
import { ClockComponent } from './components/clock/clock';

// 1. ATUALIZAMOS A ESTRUTURA DA CHAMADA PARA INCLUIR A ESPECIALIDADE
interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string; // Novo campo para a especialidade
}

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
  // Dados para gerar chamadas aleatórias
  private mockNames: string[] = ['JOÃO CARLOS DA SILVA', 'MARIA JOAQUINA DE SOUZA', 'MARCIO PABLO ALVES', 'ANA BEATRIZ OLIVEIRA', 'LUCAS CIRILO MENDES'];
  private mockDesks: string[] = ['Guichê 01', 'Guichê 02', 'Guichê 03'];
  private mockSpecialties: string[] = ['Clínico Geral', 'Cardiologia', 'Ortopedia', 'Pediatria'];

  // 2. SISTEMA DE GERAÇÃO DE SENHAS
  // Associa cada especialidade a um prefixo
  private specialtyPrefixes: { [key: string]: string } = {
    'Clínico Geral': 'CG',
    'Cardiologia': 'CA',
    'Ortopedia': 'OR',
    'Pediatria': 'PE'
  };
  // Guarda o número atual de cada tipo de senha
  private ticketCounters: { [key: string]: number } = { 'CG': 1, 'CA': 1, 'OR': 1, 'PE': 1 };

  // Propriedades de estado da aplicação
  public currentDate: string | null = '';
  public callHistory: Call[] = [];
  public currentCall: Call | null = null;
  public isCallActive = false;
  private callTimeout: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.currentDate = this.datePipe.transform(new Date(), "EEEE, d 'de' MMMM", 'pt-BR');
    
    // Inicializa com uma chamada de exemplo já no formato correto
    const initialCall: Call = { ticket: 'CG-001N', name: 'ANA BEATRIZ OLIVEIRA', desk: 'Guichê 01', specialty: 'Clínico Geral' };
    this.callHistory.push(initialCall);
    this.ticketCounters['CG']++; // Incrementa para a próxima ser 'CG-002N'
  }
  
  // 3. FUNÇÃO DE SIMULAÇÃO ATUALIZADA
  simulateNewCall() {
    if (this.isCallActive) { return; }

    // Gera dados aleatórios para a chamada
    const specialty = this.mockSpecialties[Math.floor(Math.random() * this.mockSpecialties.length)];
    const name = this.mockNames[Math.floor(Math.random() * this.mockNames.length)];
    const desk = this.mockDesks[Math.floor(Math.random() * this.mockDesks.length)];

    // Gera a nova senha sequencial com o formato XX-000N
    const prefix = this.specialtyPrefixes[specialty];
    const number = this.ticketCounters[prefix]++;
    const ticket = `${prefix}-${number.toString().padStart(3, '0')}N`;

    // Cria o novo objeto de chamada
    const newCall: Call = { ticket, name, desk, specialty };

    // Ativa a chamada e o temporizador (lógica existente)
    this.currentCall = newCall;
    this.callHistory.unshift(this.currentCall);
    if (this.callHistory.length > 5) {
      this.callHistory.pop();
    }
    this.isCallActive = true;
    
    clearTimeout(this.callTimeout);
    this.callTimeout = setTimeout(() => {
      this.isCallActive = false;
    }, 15000);
  }
}