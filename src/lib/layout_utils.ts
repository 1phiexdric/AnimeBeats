export function scrollToTop(behavior: ScrollBehavior = 'auto') {
    // intenta primero el main del layout
    const main = document.querySelector('main');
    if (main && 'scrollTo' in main) {
      (main as HTMLElement).scrollTo({ top: 0, behavior });
      return;
    }
    // fallback al window (si tu layout no usa main con overflow)
    window.scrollTo({ top: 0, behavior });
  }