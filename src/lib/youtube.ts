// src/lib/youtube.ts
// Este módulo se asegura de que el script de la API de YouTube se cargue una sola vez.

let apiPromise: Promise<void> | null = null;

export function loadYouTubeAPI(): Promise<void> {
  if (apiPromise) {
    return apiPromise;
  }

  apiPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Prevenir ejecución en el lado del servidor (SSR)
      resolve();
      return;
    }

    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;

    (window as any).onYouTubeIframeAPIReady = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load the YouTube IFrame API'));
    };

    document.head.appendChild(script);
  });

  return apiPromise;
}