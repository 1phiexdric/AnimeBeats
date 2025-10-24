<script lang="ts">
  import AnimeCard from "../components/animeCard.svelte";
  import { onMount } from "svelte";
  // export let data
  let animes: Array<Object> = [];
  
  // async function loadMore() {
  //   const nextPage = Math.floor(animes.length / 12) + 1;
  //   const res = await fetch('/api/anime?page=' + nextPage)
  //   const newAnimes = await res.json();
  //   console.log(newAnimes);
  //   animes = [...animes, ...newAnimes];
  // }
  async function loadAnimeData(tipo?: string){
    const url = tipo ? `/api/filtro?tipo=${tipo}` : '/api/filtro';
    const responseCurados = await fetch(url)
    const listaCurada = await responseCurados.json()
    console.log(`Cargados ${listaCurada.length} ítems.`);
    animes = [...listaCurada];
  }
  function handleFilter(tipo:string){
    loadAnimeData(tipo)
  }
  onMount(()=>{
    loadAnimeData()
  })
</script>

<section>
    <div class="title-container">
      <h1 class="title inter" translate="no">AnimeBeats</h1>
      <div class="filtros">
        <button onclick={() => loadAnimeData()}>Todos</button>
        <button onclick={()=>{handleFilter("anime_japones")}}>anime</button>
        <button onclick={()=>{handleFilter("")}}>Donghua</button>
        <button onclick={()=>{handleFilter("aeni")}}>Aeni</button>
      </div>
      <div class="separador"></div>
    </div>
    <div class="animeCard-container">
      {#each animes as anime}
      <AnimeCard {anime}/>
      
      {/each}

    </div>
    <!-- <button class="show-more" onclick={loadMore}>&darr;Show more</button> -->
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
  .filtros {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .filtros button {
    background-color: var(--color-background-card);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
  }

  .filtros button:hover {
    background-color: var(--color-background-hover);
    color: var(--color-text-primary);
    transform: translateY(-2px);
  }

  .filtros button.selected {
    background-color: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  @media(width <720px){
    .title{
      margin-top: 50px;
      text-align: center;
    }
    .separador{
      width: 100%;
    }
  }

</style>