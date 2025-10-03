import { Component, AfterViewInit } from '@angular/core';

// Declara a variável global 'YT' para o TypeScript não reclamar
declare var YT: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrls: ['./video-player.scss']
})
export class VideoPlayer implements AfterViewInit {

  player: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.initPlayer();
  }

  initPlayer(): void {
    // O ID do vídeo do QuarkClinic
    const videoId = 'WdxYgjjPSjg';

    this.player = new YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,    // Autoplay
        controls: 0,    // Sem controles
        loop: 1,        // Loop
        playlist: videoId // Para o loop funcionar, o ID precisa estar na playlist
      },
      events: {
        'onReady': (event: any) => {
          event.target.playVideo();
          event.target.setPlaybackQuality('highres'); 
        }
      }
    });
  }
}