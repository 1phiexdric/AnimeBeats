let apiPromise: Promise<void> | null = null;

export function loadYoutubeApi(): Promise<void> {
  if (apiPromise) {
    return apiPromise;
  }
  apiPromise = new Promise((resolve, reject) => {
    if ((window as any).YT && (window as any).YT.Player) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.defer = true;
    window.onYouTubeIframeAPIReady=()=>{
        resolve()
    }

    script.onerror = () =>{
        reject(new Error('Failed to load the Youtube Iframe api'))
    }
    document.head.appendChild(script)
  });
  return apiPromise;
}

