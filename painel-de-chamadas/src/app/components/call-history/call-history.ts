import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import necessário para *ngFor

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
  imports: [CommonModule] // ✅ Permite usar *ngFor no template
})
export class CallHistory {
  @Input() historyData: Call[] = [];
  @Input() showCurrent: boolean = true;
  @Input() borderColor: string = '#ccc';
}
