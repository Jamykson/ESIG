# 🩺 Painel de Chamadas para Sala de Espera

Este projeto é uma solução para o **desafio técnico do processo seletivo de estágio Front-End**, que consiste em desenvolver um **painel digital (TV)** para gerenciamento do fluxo de pacientes em uma sala de espera.

A aplicação foi construída utilizando **Angular** e implementa uma **interface de página única (SPA)** com dois estados visuais principais:
- **Estado padrão:** entretenimento (exibe um vídeo do YouTube)
- **Estado de chamada:** exibe as informações de atendimento com destaque

---

## 🚀 Tecnologias Utilizadas

- **Angular** → Framework principal para a construção da aplicação  
- **TypeScript** → Superset do JavaScript que adiciona tipagem estática  
- **SCSS** → Pré-processador CSS para estilos mais organizados e poderosos  
- **YouTube IFrame Player API** → Para incorporar e controlar o player de vídeo do YouTube  

---

## ⚙️ Como Executar o Projeto

### 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (que inclui o **npm**)
- [Angular CLI](https://angular.io/cli) instalado globalmente  
  Caso ainda não tenha, instale com o comando:

```bash
npm install -g @angular/cli

✨ Funcionalidades Implementadas
O projeto implementa os seguintes requisitos do desafio:

✅ REQ_01: Aplicação de Página Única (SPA): A interface alterna entre dois estados visuais sem recarregar a página.

✅ REQ_02: Animação Suave: O componente de vídeo transita suavemente entre o estado de destaque e o estado de miniatura.

✅ REQ_03: Simulação da Chamada: Um botão "Simular Nova Chamada" dispara o evento e ativa o estado de chamada.

✅ REQ_04: Timer de Retorno Automático: O estado de chamada dura 15 segundos antes de retornar automaticamente ao estado padrão.

✅ REQ_05: Reprodução de Vídeo: O vídeo do YouTube é reproduzido automaticamente, com som e em loop contínuo.

✅ REQ_06: Atualização do Histórico: A cada nova chamada, a lista de histórico é atualizada com a chamada mais recente no topo.

✅ REQ_07: Código Limpo e Organizado: O código-fonte foi estruturado e comentado para facilitar a leitura e manutenção.

✅ REQ_08: Suporte a Playlist (Vídeo Único em Loop): A aplicação usa a funcionalidade de "playlist de um vídeo só" da API do YouTube para cumprir o requisito de loop de forma robusta.

✅ REQ_09: Responsividade: O layout se adapta a diferentes tamanhos de tela, com foco em resoluções a partir de 1366x768, e se ajusta para telas menores como tablets.

