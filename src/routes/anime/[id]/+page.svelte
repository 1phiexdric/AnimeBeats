<script lang="ts">
  // store
  import { userStore } from '$lib/store/userStore';

  //svelte
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  // components
  import ThemeCard from '../../../components/themeCard.svelte';
  import YoutubePlayer from '../../../components/youtubePlayer.svelte';

  // utils
  import { scrollToTop } from '$lib/layout_utils';
  export let data;
  $: ({ animeDetails, animeThemes, id, isliked} = data);
  
  

  onMount(() => {
    scrollToTop('auto');
  });

  afterNavigate(() => {
    setTimeout(() => scrollToTop('smooth'), 0);
  });

  function goBack(){
    history.back()
  }
  let islikedbtn = isliked;
  async function likeAnime(){
    islikedbtn = !islikedbtn
    const addtoBd = await fetch(`/api/fav/${$userStore?._id}/animes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
  }
</script>

{#if animeDetails}
  <section
    class="anime-details-container"
    style="--anime-color: {animeDetails.coverImage.color}"
  >
    <div class="btns-up-container">
<button onclick={goBack} class="btn-backward btn-de-arriba" aria-label="return to home btn">
    <i class="fa-solid fa-backward"></i>
  </button>
  {#if $userStore}
    <button class="btn-de-arriba btn-like {isliked || islikedbtn ? 'active': ''}" onclick={likeAnime}>
    <i class="fa-solid fa-heart"></i>
  </button>
  {/if}
    </div>
    <div class="banner-container">
      <img
        src={animeDetails.bannerImage}
        alt="{animeDetails.title.english} banner"
        class="banner-image"
      />
    </div>
    <div class="details-content">
      <div class="cover-image-container">
        <img
          src={animeDetails.coverImage.extraLarge}
          alt="{animeDetails.title.english} cover"
          class="cover-image"
        />
      </div>
      <div class="main-info">
        <h1 class="oswald" translate="no">{animeDetails.title.romaji}</h1>
        <div class="genres">
          {#each animeDetails.genres as genre}
            <span class="genre">{genre}</span>
          {/each}
        </div>
        <h2>Descripción</h2>
        <div class="description">{@html animeDetails.description}</div>
        <div class="additional-info">
          <p><strong>Episodios:</strong> {animeDetails.episodes}</p>
          <div>
            <strong>Estudios:</strong>
            <ul>
              {#each animeDetails.studios.nodes as studio}
                <li>{studio.name}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {#if animeThemes.openings || animeThemes.endings}
<section class="themes-section">
  <h2 class="inter">Canciones</h2>
  <div class="themes-grid">
    <div class="theme-list">
      <h3>Openings</h3>
      {#if animeThemes.openings.length >0}
      {#each animeThemes.openings as op}
      <ThemeCard {...(op as any)} anime={animeDetails.title.romaji}/>
      {/each}
      {:else}
      <p>No openings found.</p>
      {/if}
    </div>
    <div class="theme-list">
      <h3>Endings</h3>
      {#if animeThemes.endings.length > 0}
      {#each animeThemes.endings as ed}
      <ThemeCard {...(ed as any)} anime={animeDetails.title.romaji}/>
      {/each}
      {:else}
      <p>No endings found.</p>
      {/if}
    </div>
  </div>
  {#if animeThemes?.openings?.length > 0 || animeThemes?.endings?.length > 0}
    <YoutubePlayer />
  {/if}
</section>
{/if}
{:else}
  <p class="inter" style="text-align: center; padding: 2rem;">
    Anime not found or failed to load.
  </p>
{/if}

<style>
  .anime-details-container {
    background: linear-gradient(
      to bottom,
      var(--anime-color, #333),
      #1a1a1a 80%
    );
    color: #fff;
    padding-bottom: 2rem;
  }

  .btns-up-container{
    position: absolute;
    margin: 20px auto;
    display: flex;
    max-width: 100%;
    min-width: 80%;
    justify-content: space-between;
    padding: 20px;
  }
  .btn-de-arriba{
    color: white;
    font-size: 1.5rem;
    background-color: #333;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  } 
  .btn-like.active{
    color: var(--color-accent);
  }
  .banner-image {
    width: 100%;
    height: 200px; /* Altura reducida para móviles */
    object-fit: cover;
    opacity: 0.4;
  }

  .details-content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra la portada en móvil */
    gap: 1.5rem;
    padding: 1rem;
    max-width: 1200px;
    margin: -100px auto 0; /* Margen superior reducido */
    position: relative;
  }

  .cover-image-container {
    flex-shrink: 0;
  }

  .cover-image {
    width: 180px; /* Tamaño de portada reducido para móvil */
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  .main-info {
    flex-grow: 1;
    text-align: center; /* Centra el texto en móvil */
  }

  h1 {
    font-size: 2.5rem; /* Tamaño de fuente reducido */
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centra los géneros */
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .genre {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.3rem 0.7rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid var(--anime-color, #fff);
    padding-bottom: 0.3rem;
  }

  .description {
    line-height: 1.6;
    text-align: left; /* Mantiene la descripción alineada a la izquierda */
  }

  .additional-info {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left; /* Mantiene esto alineado a la izquierda */
  }

  .additional-info p,
  .additional-info div {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 8px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  /* --- Seccion de Temas --- */
  .themes-section {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    color: #fff;
  }

  .themes-section h2 {
    border-bottom-color: #555;
  }

  .themes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .theme-list h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }


  /* --- Media Queries para Pantallas Grandes --- */
  @media (min-width: 768px) {
    .banner-image {
      height: 350px; /* Restaura altura del banner */
    }
    .details-content {
      flex-direction: row; /* Vuelve a dos columnas */
      align-items: flex-start; /* Alinea al inicio */
      gap: 2rem;
      padding: 1rem 2rem;
      margin: -150px auto 0;
    }
    .cover-image {
      width: 225px;
    }
    .main-info {
      text-align: left; /* Alinea el texto a la izquierda */
    }
    h1 {
      font-size: 2.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    .genres {
      justify-content: flex-start; /* Alinea géneros a la izquierda */
    }
    .themes-section {
      padding: 2rem;
    }
    .themes-grid {
      grid-template-columns: 1fr 1fr; /* Dos columnas para los temas */
    }
    
  }
  @media(width < 800px){
    .btns-up-container{
      margin-top: 60px;
      width: 100%;
      padding: 10px;
    }
  }
</style>
