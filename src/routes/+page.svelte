<script lang="ts">
  import AnimeCard from "../components/animeCard.svelte";
  export let data
  let animes: Array<Object> = data.animes|| [];
  
  async function loadMore() {
    const nextPage = Math.floor(animes.length / 12) + 1;
    const res = await fetch('/api/anime?page=' + nextPage)
    const newAnimes = await res.json();
    animes = [...animes, ...newAnimes];
  }
</script>

<section>
    <div class="title-container">
      <h1 class="title inter">AnimeBeats</h1>
      <div class="separador"></div>
    </div>
    <div class="animeCard-container">
      {#each animes as anime}
      <AnimeCard {anime}/>
      
      {/each}

    </div>
    <button class="show-more" onclick={loadMore}>&darr;Show more</button>
</section>

<style>
  section{
    padding: 1rem 1.5rem; /* Ajustado para móviles */
  }
  .title-container{
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }
  .title {
    color: var(--color-text-primary);
    font-size: 2rem; /* Tamaño reducido para móviles */
    margin: 0;
  }
  
  /* Usando Grid para un layout más robusto */
  .animeCard-container{
    display: grid;
    /* Crea columnas de mínimo 150px, y las ajusta para llenar el espacio */
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px; /* Espacio entre tarjetas */
    justify-items: center; /* Centra las tarjetas en sus celdas */
  }

  .show-more{
    margin: 2rem auto; /* Más margen superior */
    display: block;
    color: #fff;
    background: none; /* Fondo transparente */
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    border-bottom: 1px solid var(--color-border);
    padding: 0.5rem 1rem;
  }
  .show-more:hover{
    background-color: var(--color-background-hover);
  }

  /* Media Query para pantallas más grandes */
  @media (min-width: 768px) {
    section {
      padding: 2rem 3rem;
    }
    .title {
      font-size: 2.5rem; /* Restaura el tamaño en pantallas grandes */
    }
    .animeCard-container {
      gap: 25px;
    }
  }

</style>