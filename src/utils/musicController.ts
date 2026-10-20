// YouTube Player controller for the official wedding melody:
// Song: Kudmayi (Film Version) | Rocky Aur Rani Kii Prem Kahaani | Ranveer | Alia | Shahid | Pritam | Amitabh
// Link: https://www.youtube.com/watch?v=3qpxJEp4Ec4&list=RD3qpxJEp4Ec4&start_radio=1
// Start time: 6 seconds

export const WEDDING_SONG_INFO = {
  title: 'Kudmayi (Film Version)',
  subtitle: 'Rocky Aur Rani Kii Prem Kahaani',
  artists: 'Ranveer · Alia · Shahid · Pritam · Amitabh',
  youtubeId: '3qpxJEp4Ec4',
  startTime: 6,
  youtubeUrl: 'https://www.youtube.com/watch?v=3qpxJEp4Ec4&list=RD3qpxJEp4Ec4&start_radio=1',
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type MusicListener = (state: { isPlaying: boolean; isReady: boolean }) => void;

class WeddingMusicController {
  private player: any = null;
  private isReady = false;
  private isPlaying = false;
  private listeners = new Set<MusicListener>();
  private requestedPlay = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initYouTubeAPI();
    }
  }

  private initYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this.createPlayer();
      return;
    }

    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevOnReady) prevOnReady();
      this.createPlayer();
    };

    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }

  public registerContainer(containerId: string) {
    if (this.player) return;
    if (window.YT && window.YT.Player) {
      this.createPlayer(containerId);
    }
  }

  private createPlayer(elementId = 'wedding-yt-audio-player') {
    const el = document.getElementById(elementId);
    if (!el || this.player) return;

    try {
      this.player = new window.YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: WEDDING_SONG_INFO.youtubeId,
        playerVars: {
          start: WEDDING_SONG_INFO.startTime,
          autoplay: 0,
          controls: 1,
          loop: 1,
          playlist: WEDDING_SONG_INFO.youtubeId,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            this.isReady = true;
            try {
              event.target.seekTo(WEDDING_SONG_INFO.startTime, true);
            } catch {
              // ignore
            }
            if (this.requestedPlay) {
              this.play();
            }
            this.notify();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1, PAUSED is 2, ENDED is 0, BUFFERING is 3
            if (event.data === 1) {
              this.isPlaying = true;
            } else if (event.data === 2 || event.data === 0) {
              this.isPlaying = false;
            }
            this.notify();
          },
        },
      });
    } catch {
      // Fallback
    }
  }

  public subscribe(listener: MusicListener) {
    this.listeners.add(listener);
    listener({ isPlaying: this.isPlaying, isReady: this.isReady });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ isPlaying: this.isPlaying, isReady: this.isReady }));
  }

  public play(fromStart = false) {
    this.requestedPlay = true;
    if (this.player && this.isReady && typeof this.player.playVideo === 'function') {
      try {
        if (fromStart || !this.isPlaying) {
          const current = this.player.getCurrentTime?.() ?? 0;
          if (fromStart || current < WEDDING_SONG_INFO.startTime - 1) {
            this.player.seekTo(WEDDING_SONG_INFO.startTime, true);
          }
        }
        this.player.playVideo();
        this.isPlaying = true;
        this.notify();
      } catch {
        // Audio might require user interaction
      }
    }
  }

  public pause() {
    this.requestedPlay = false;
    if (this.player && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
        this.isPlaying = false;
        this.notify();
      } catch {
        // ignore
      }
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seekToSixSeconds() {
    if (this.player && typeof this.player.seekTo === 'function') {
      try {
        this.player.seekTo(WEDDING_SONG_INFO.startTime, true);
        this.player.playVideo();
        this.isPlaying = true;
        this.notify();
      } catch {
        // ignore
      }
    }
  }

  public get active(): boolean {
    return this.isPlaying;
  }
}

export const weddingMusic = new WeddingMusicController();
