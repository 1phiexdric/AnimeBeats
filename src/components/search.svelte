<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let { showSearch } = $props();
  const dispatch = createEventDispatcher();
  let searchterm = "";
  let searchResults: Array<any> = $state([]);
  function closeSearch() {
    dispatch("close");
  }
  let debounceTimer: any;
  function debouncing() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (searchterm.length > 2) {
        fetchResults();
      } else {
        searchResults = [];
      }
    }, 300);
  }
  async function fetchResults() {
    const res = await fetch(`/api/search?query=${searchterm}`);
    searchResults = await res.json()
  }
</script>

{#if showSearch}
  <div class="search-container">
    <div class="container">
      <div>
        <button onclick={closeSearch}
          ><i class="fa-solid fa-arrow-left"></i></button
        >
        <div class="input-container">
          <input
            type="text"
            placeholder="Buscar anime..."
            class="search-input"
            oninput={debouncing}
            bind:value={searchterm}
          />
          <a href=""><i class="fa-solid fa-magnifying-glass"></i></a>
        </div>
      </div>
      <ul>
        {#each searchResults as result}
          <li>
            <a onclick={()=>{
                closeSearch();
                searchterm = ""
                searchResults = []
            }} href="/anime/{result.id}">{result.title.english}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  /* Search input styles */
  .search-container {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.9);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-container input {
    border: 3px solid var(--color-background-card);
    padding: 0.5rem 2rem;
    width: 300px;
    border-radius: 3px;
  }
  .search-container div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  button i {
    color: var(--color-text-primary);
    font-size: 1.5rem;
  }
  .input-container {
    position: relative;
  }
  .input-container button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  ul {
    margin-top: 2rem;
    list-style: none;
    padding: 0;
    width: 300px;
  }
  ul li {
    border-bottom: 1px solid var(--color-border);
    padding: 10px 0;
  }
</style>
