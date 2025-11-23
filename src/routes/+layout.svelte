<script lang="ts">
  import "../app.css";
  import type { PageData } from "./$types";
  import { userStore } from "$lib/store/userStore";

  // componentes
  import favicon from "$lib/assets/animeBeats.ico";
  import Navbar from "../components/navbar.svelte";

  let { children, data } = $props() as { 
        children: any;
        data: PageData 
    };
    $effect(() => {
    userStore.set(data.user || null);
  });
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