<script lang="ts">
  import AnimeCard from "../components/animeCard.svelte";
  import { onMount } from "svelte";
  import { fetchAniListPage } from "$lib/index";
  let animes: Array<Object> = [];
  onMount(async () => {
    const data = await fetchAniListPage(1, 12);
    animes = [...data.data.Page.media];
  });
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
</section>

<style>
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
</style>