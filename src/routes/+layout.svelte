<script lang="ts">
  import "../app.css";
  import type { PageData } from "./$types";
  import { userStore } from "$lib/store/userStore";
  import favicon from "$lib/assets/animeBeats.ico";
  import Navbar from "../components/navbar.svelte";
  let { children, data } = $props() as { 
        children: any;
        data: PageData 
    };
    $effect(() => {
    console.log(`data`, data.user);
    // Esto se ejecutará cada vez que 'data.user' cambie
    // (en la carga inicial, y después de un login o logout)
    userStore.set(data.user || null);
    
    // Opcionalmente, puedes loguearlo para verlo funcionar
    // console.log('Store actualizado:', $userStore); 
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