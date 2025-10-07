import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Call {
  ticket: string;
  name: string;
  desk: string;
  specialty: string;
}

@Component({
  selector: 'app-call-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-history.html',
  styleUrls: ['./call-history.scss']
})
export class CallHistory implements OnInit {
  @Input() historyData: Call[] = [];
  @Input() showCurrent: boolean = true;

  /** Cor da borda esquerda dos cards do histórico */
  @Input() borderColor: string = '#d3dbd1ff';

  constructor(private hostElement: ElementRef) {}

  ngOnInit() {
    // Define a variável CSS --border-color no host para que o SCSS use
    this.hostElement.nativeElement.style.setProperty('--border-color', this.borderColor);
  }

  /** Abrevia o nome completo para iniciais */
  public abbreviateName(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    if (parts.length < 2) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    }
    const firstNameInitial = parts[0].charAt(0).toUpperCase();
    const secondName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
    return `${firstNameInitial}. ${secondName}`;
  }
}
