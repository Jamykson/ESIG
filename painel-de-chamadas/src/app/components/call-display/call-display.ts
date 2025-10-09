import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-call-display',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './call-display.html',
  styleUrl: './call-display.scss'
})
export class CallDisplay {
  
  @Input() callData: any; 
}