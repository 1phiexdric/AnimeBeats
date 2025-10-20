<script lang="ts">
  import AnimeCard from "../components/animeCard.svelte";
  import { onMount } from "svelte";
  import { fetchAniListPage } from "$lib/index";
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
    padding: 1rem 2rem;
  }
  .title-container{
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }
  .title {
    color: var(--color-text-primary);
    font-size: 2.5rem;
    margin: 0;
  }
  .animeCard-container{
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
  }
  .show-more{
    margin: 1rem auto;
    display: block;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    border-bottom: 1px solid var(--color-border);
  }
  .show-more:hover{
    background-color: var(--color-background-hover);
  }
</style>