<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/animeBeats.ico";
  import Navbar from "../components/navbar.svelte";
  let { children } = $props();

</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-container">
  
  <Navbar />
    <main>
        {@render children()}
        
    </main>
</div>

<style>
  .app-container {
    display: flex;
    height: 100dvh;
    width: 100vw;
  }

  main {
    overflow-y: auto;
    flex-grow: 1;
  }

</style>