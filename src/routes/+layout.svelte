<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "../components/navbar.svelte";
  import YoutubePlayer from "../components/youtubePlayer.svelte";
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
    height: 100vh;
    width: 100vw;
  }

  main {
    overflow-y: auto;
    height: 100%;
  }

</style>