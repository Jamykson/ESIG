// Importe OnChanges e SimpleChanges
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string;
}

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.html',
  styleUrls: ['./call-history.scss'],
  standalone: true,
  imports: [CommonModule]
})
// Adicione 'implements OnChanges' aqui
export class CallHistory implements OnChanges {
  @Input() historyData: Call[] = [];
  @Input() showCurrent: boolean = true;
  @Input() borderColor: string = '#ccc';

  // =====> NOVO CÓDIGO DE TESTE ADICIONADO AQUI <=====
  ngOnChanges(changes: SimpleChanges) {
    // Este código vai rodar toda vez que o 'historyData' for atualizado pelo componente pai
    if (changes['historyData']) {
      console.log('>>> O COMPONENTE CallHistory RECEBEU DADOS! <<<');
      console.log(changes['historyData'].currentValue);
    }
  }

  // A função de abreviar continua aqui, caso precisemos dela depois
  public abbreviateName(fullName: string | null | undefined): string {
    if (!fullName) { return ''; }
    const names = fullName.trim().split(' ');
    if (names.length <= 1) { return fullName; }
    const firstInitial = names[0].charAt(0).toUpperCase();
    const secondName = names[1];
    return `${firstInitial}. ${secondName}`;
  }
}