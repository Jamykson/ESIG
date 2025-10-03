import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

// --- Importações para o idioma e providers ---
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// --- Registra os dados de localidade do Português ---
registerLocaleData(localePt);

// --- A configuração de inicialização sem as rotas ---
bootstrapApplication(AppComponent, {
  providers: [
    // A linha 'provideRouter(routes)' foi removida daqui

    // Define o idioma padrão da aplicação como 'pt-BR'
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
}).catch((err) => console.error(err));