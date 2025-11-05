<script lang="ts">
  import AnimeCard from "../components/animeCard.svelte";
  import { onMount } from "svelte";
  import Loader from "../components/loader.svelte";
  import { fade } from "svelte/transition";
  // export let data
  let animes: Array<Object> = $state([]);
  let selectedTipo: string = $state("todos");
  const loopArray = Array(12).fill(null);

  let page: number = 1;
  let hasMore: boolean = $state(true)

  async function loadAnimeData(tipo?: string) {
    const url = tipo && tipo != 'todos' ? `/api/filtro?tipo=${tipo}&page=${page}` : `/api/filtro?page=${page}`;
    const responseCurados = await fetch(url);
    const listaCurada = await responseCurados.json();
    console.log(`Cargados ${listaCurada.length} ítems.`);
    if(listaCurada.length > 0){
      animes = [...animes, ...listaCurada]
      page++
    }
    if(listaCurada.length < 12){
      hasMore = false
      
    }
  }
  function handleFilter(tipo: string) {
    hasMore =true
    animes = []
    page = 1
    loadAnimeData(tipo);
  }
  onMount(() => {
    loadAnimeData();
  });
  let isloaded = $derived(animes.length > 0);
</script>

<section>
  <div class="title-container">
    <h1 class="title oswald" translate="no">AnimeBeats</h1>
    <div class="filtros">
      <button
        onclick={() => {
          selectedTipo = "todos";
handleFilter('todos')
        }}
        class:selected={selectedTipo === "todos"}
        aria-pressed={selectedTipo === "todos"}>Todos</button
      >
      <button
        onclick={() => {
          selectedTipo = "anime_japones";
          handleFilter("anime_japones");
        }}
        class:selected={selectedTipo === "anime_japones"}
        aria-pressed={selectedTipo === "anime_japones"}>anime</button
      >
      <button
        onclick={() => {
          selectedTipo = "donghua";
          handleFilter("donghua");
        }}
        class:selected={selectedTipo === "donghua"}
        aria-pressed={selectedTipo === "donghua"}>Donghua</button
      >
      <button
        onclick={() => {
          selectedTipo = "aeni";
          handleFilter("aeni");
        }}
        class:selected={selectedTipo === "aeni"}
        aria-pressed={selectedTipo === "aeni"}>Aeni</button
      >
    </div>
    <div class="separador"></div>
  </div>
  <div class="animeCard-container">
    {#if isloaded}
      {#each animes as anime}
        <AnimeCard {anime} />
      {/each}
    {:else}
      {#each loopArray as _}
        <div transition:fade={{ duration: 250 }}>
          <Loader />
        </div>
      {/each}
    {/if}
  </div>
 {#if hasMore}
    <button class="show-more oswald" onclick={()=>{loadAnimeData(selectedTipo)}}>Mostrar más &darr;</button>
 {/if}
</section>

<style>
  section {
    padding: 1rem 1.5rem; /* Ajustado para móviles */
  }
  .title-container {
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }
  .title {
    color: var(--color-text-primary);
    font-size: 2.5rem; /* Tamaño reducido para móviles */
    margin: 0;
  }

  /* Usando Grid para un layout más robusto */
  .animeCard-container {
    display: grid;
    /* Crea columnas de mínimo 150px, y las ajusta para llenar el espacio */
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px; /* Espacio entre tarjetas */
    justify-items: center; /* Centra las tarjetas en sus celdas */
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

  .show-more{
    display: block;
    margin: 20px auto;
    font-size: 1.3rem;
    border-bottom: 3px solid var(--color-border);
    padding: 5px;
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
      gap: 20px;
    }
  }
  @media (width <720px) {
    .title {
      margin-top: 50px;
      text-align: center;
    }
    .separador {
      width: 100%;
    }
    .filtros button {
      font-size: 0.9rem;
      padding: 0.5rem 0.3rem;
    }
    .animeCard-container {
      gap: 10px;
    }
  }
  @media (width < 400px) {
    .animeCard-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
