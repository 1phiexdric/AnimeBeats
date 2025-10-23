<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "../components/navbar.svelte";
  import MusicPlayer from "../components/MusicPlayer.svelte";
  let { children } = $props();

</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-container">
  <Navbar />
  <div class="content-container">
    <main>
        {@render children()}
    </main>
    <MusicPlayer/>
  </div>
</div>

<style>
  .app-container {
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  .content-container {
    overflow-y: auto;
    height: 100%;
  }

</style>