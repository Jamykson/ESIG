import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importe DatePipe

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe], 
  templateUrl: './clock.html',
  styleUrls: ['./clock.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime: string | null = '';
  private timer: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime(): void {
    
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
  }
}