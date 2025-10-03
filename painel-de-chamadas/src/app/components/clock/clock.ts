import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importe DatePipe

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe], // Adicione DatePipe aos providers
  templateUrl: './clock.html',
  styleUrls: ['./clock.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime: string | null = '';
  private timer: any;

  // Injeta o DatePipe no componente
  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    // Define a hora inicial
    this.updateTime();
    // Configura um timer para atualizar a hora a cada segundo
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    // Limpa o timer quando o componente é destruído para evitar vazamento de memória
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime(): void {
    // Formata a data atual para mostrar apenas horas e minutos (ex: 16:04)
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
  }
}