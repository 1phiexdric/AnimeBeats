// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
// src/types/youtube.d.ts
declare global {
  namespace YT {
    class Player {
      constructor(id: string, options: any);
      loadVideoById(videoId: string): void;
      playVideo(): void;
      pauseVideo(): void;
      getVideoData(): { video_id: string };
    }

    interface OnStateChangeEvent {
      data: number;
    }
  }

  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

export {};