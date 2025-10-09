import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Registra os dados de localidade do Português 
registerLocaleData(localePt);

bootstrapApplication(AppComponent, {
  providers: [

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
}).catch((err) => console.error(err));