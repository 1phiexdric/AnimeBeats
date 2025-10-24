<script lang="ts">
  import { playerStore } from "$lib/store/playerStore";

  let { titulo, numero, enlace_youtube, artista, episodios } =
    $props();
  function playTheme(id: any) {
    if (id) {
      playerStore.playVideo(id);
    }
  }
  function extractYouTubeVideoId(url: string): string | null {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  console.log( extractYouTubeVideoId(enlace_youtube))
</script>

<article>
  <div class="main-content">
    <button class="play-button" aria-label="Play theme" onclick={()=>{
        const videoId = extractYouTubeVideoId(enlace_youtube)
        playTheme(videoId)
    }}>
      <i class="fa-solid fa-play"></i>
    </button>
    <div class="text-content">
      <h3 translate="no">{titulo} - OP:{numero}</h3>
      <p class="metadata artist" translate="no">{artista}</p>
      <p class="metadata">Episodios: {episodios}</p>
    </div>
  </div>
  {#if enlace_youtube}
    <a
      href={enlace_youtube}
      target="_blank"
      class="youtube-link"
      aria-label="Watch on YouTube"
      title="go to youtube"
    >
      <i class="fa-brands fa-youtube"></i>
    </a>
  {/if}
</article>

<style>
  article {
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid transparent; /* Start with a transparent border */
    border-radius: 12px; /* Slightly larger radius */
    padding: 1rem;
    margin: 0.5rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s ease,
      border-color 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  article:hover {
    transform: translateY(-3px);
    border-color: var(--color-accent); /* Glow effect on hover */
  }

  .main-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .play-button {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
    flex-shrink: 0; /* Prevent button from shrinking */
  }

  .play-button i {
    color: var(--color-text-primary);
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  article:hover .play-button {
    background-color: var(--color-accent);
    transform: scale(1.1);
  }

  article:hover .play-button i {
    color: #fff;
  }

  .text-content h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1em;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .metadata {
    margin: 0;
    font-size: 0.85em;
    color: var(--color-text-secondary);
  }

  .artist {
    font-style: italic;
  }

  .youtube-link {
    color: var(--color-text-secondary);
    font-size: 1.8em;
    text-decoration: none;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .youtube-link:hover {
    color: #ff0000; /* YouTube Red */
    transform: scale(1.1);
  }
</style>
