import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface para definir a estrutura de dados de uma chamada
interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string;
}

/**
 * @Component CallHistory
 * @description Um componente reutilizável para exibir uma lista de chamadas (histórico).
 * Ele reage a mudanças nos dados recebidos do componente pai.
 */
@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.html',
  styleUrls: ['./call-history.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CallHistory implements OnChanges {

  // ===================================================================
  // PROPRIEDADES DE ENTRADA (INPUTS)
  // ===================================================================

  /**
   * @Input historyData
   * @description O array de objetos de chamada que será exibido.
   * Recebido do componente pai.
   */
  @Input() historyData: Call[] = [];

  /**
   * @Input showCurrent
   * @description Flag para controlar se a chamada mais recente (atual)
   * deve ter um destaque especial.
   */
  @Input() showCurrent: boolean = true;

  /**
   * @Input borderColor
   * @description Permite customizar a cor da borda do componente a partir do pai.
   */
  @Input() borderColor: string = '#ccc';


  // ===================================================================
  // CICLO DE VIDA (LIFECYCLE HOOKS)
  // ===================================================================

  /**
   * Método do ciclo de vida do Angular que é executado sempre que um
   * dos @Inputs do componente é alterado pelo componente pai.
   * * @param changes Um objeto contendo as propriedades que mudaram.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se a propriedade 'historyData' foi a que mudou
    if (changes['historyData']) {
      // Este bloco é útil para depuração (debug) ou para executar
      // uma lógica específica sempre que o histórico for atualizado.
      console.log('O histórico de chamadas foi atualizado:', changes['historyData'].currentValue);
    }
  }
}