<script lang="ts">
  // stores
  import { playerStore } from "$lib/store/playerStore";
  import {userStore} from "$lib/store/userStore";

  // svelte/sveltekit
  import { slide } from "svelte/transition";
 

  let { titulo, numero, enlace_youtube, artista, episodios, version,
    anime, onDelete } = $props();
 
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
  let btnLikeActive = $state(false);
  async function liketheme(){
    btnLikeActive = !btnLikeActive
    const songToAdd = {
      titulo,
      artista,
      enlace_youtube,
      anime
    }
    const response = fetch(`/api/fav/songs/${$userStore?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(songToAdd)
    })
   onDelete()
  }
  async function deletetheme(){
    const response = fetch(`/api/fav/songs/${$userStore?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({enlace_youtube})
    })
    // return (await response).json()
    onDelete() // Llamar a la función pasada desde el padre para actualizar la UI
  }
</script>

<article out:slide={{ duration: 300 }}>
  <div class="main-content">
    <button class="play-button" aria-label="Play theme" onclick={()=>{
        const videoId = extractYouTubeVideoId(enlace_youtube)
        playTheme(videoId)
    }}>
      <i class="fa-solid fa-play"></i>
    </button>
    <div class="text-content">
      <h3 translate="no" class="oswald">{titulo}{numero? ` - OP:${numero}`: ""}</h3>
      <p class="metadata artist" translate="no">{artista}</p>
      {#if anime}
        <p class="metadata anime" translate="no">Anime: {anime}</p>
      {/if}
      {#if episodios}
      <p class="metadata">Episodios: {episodios}</p>
        
      {/if}
      {#if version}
        <p class="metadata">version: {version}</p>
      {/if}
    </div>
  </div>
  <div class="btns-container">

    {#if $userStore && episodios}
    <button class="interactive btn-like {btnLikeActive ? "active" :""}" aria-label="like theme" onclick={liketheme}>
      <i class="fa-solid fa-heart"></i>
    </button>
    {:else if $userStore && !episodios}
    <button class="interactive btn-trash" aria-label="delete theme from favorites" onclick={deletetheme}>
      <i class="fa-solid fa-trash"></i>
    </button>
    {/if}
    {#if enlace_youtube}
    <a
    href={enlace_youtube}
    target="_blank"
    class="interactive youtube-link"
    aria-label="Watch on YouTube"
    title="go to youtube"
    >
    <i class="fa-brands fa-youtube"></i>
  </a>
  {/if}
</div>
</article>

<style>
  article {
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid transparent; /* Comienza con un borde transparente */
    border-radius: 12px; /* Radio ligeramente más grande */
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
    border-color: var(--color-accent); /* Efecto de brillo al pasar el mouse */
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
    flex-shrink: 0; /* Evita que el botón se encoja */
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

  .btns-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .btn-like, .youtube-link, .btn-trash {
    color: var(--color-text-secondary);
    font-size: 1.8em;
    text-decoration: none;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .youtube-link:hover {
    color: #ff0000; /* Rojo de YouTube */
    transform: scale(1.1);
  }
  .btn-like:hover, .btn-like.active {
    color: var(--color-accent);
  }
</style>
