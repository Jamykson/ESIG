Painel de Chamadas para Sala de Espera
Este projeto é uma solução para o desafio técnico do processo seletivo de estágio Front-End, que consiste em desenvolver um painel digital (TV) para gerenciamento do fluxo de pacientes em uma sala de espera.

A aplicação foi construída utilizando Angular e implementa uma interface de página única (SPA) com dois estados visuais principais: um estado padrão para entretenimento (exibindo um vídeo do YouTube) e um estado de chamada para exibir informações de atendimento com destaque.

🚀 Tecnologias Utilizadas
Angular: Framework principal para a construção da aplicação.

TypeScript: Superset do JavaScript que adiciona tipagem estática.

SCSS: Pré-processador CSS para estilos mais organizados e poderosos.

YouTube IFrame Player API: Para incorporar e controlar o player de vídeo do YouTube.

⚙️ Como Executar o Projeto
Para rodar esta aplicação em um ambiente local, siga os passos abaixo.

Pré-requisitos
Você precisa ter o Node.js (que inclui o npm) instalado em sua máquina.

Você precisa ter o Angular CLI instalado globalmente. Se não tiver, instale com o comando:

npm install -g @angular/cli

Passos para a Instalação e Execução
Clone o repositório para a sua máquina local.

Acesse a pasta do projeto pelo terminal:

cd painel-de-chamadas/

Instale as dependências do projeto:

npm install

Inicie o servidor de desenvolvimento do Angular:

ng serve --open

O comando ng serve irá compilar a aplicação e iniciar um servidor local. A flag --open (ou -o) abrirá automaticamente o seu navegador padrão no endereço http://localhost:4200/.

A aplicação estará rodando e pronta para ser testada!

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

