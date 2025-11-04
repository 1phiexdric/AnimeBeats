<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let { showSearch } = $props();
  const dispatch = createEventDispatcher();
  let searchterm = $state("");
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
          <button aria-label="search-button" class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>
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
  .search-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5rem;
    backdrop-filter: blur(5px);
  }

  .container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .search-container div:first-child {
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
  }

  .input-container {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 0.8rem 3rem 0.8rem 1.5rem;
    border-radius: 8px;
    border: 2px solid var(--color-border);
    background-color: var(--color-background-card);
    color: var(--color-text-primary);
    font-size: 1rem;
    transition: border-color 0.2s ease-in-out;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .search-input::placeholder {
    color: var(--color-text-secondary);
  }

  button:not(.search-button) {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    font-size: 1.5rem;
  }

  button:not(.search-button):hover {
    color: var(--color-text-primary);
  }

  .input-container button {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: var(--color-text-secondary);
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
    max-height: 60vh;
    overflow-y: auto;
  }

  li {
    background-color: var(--color-background-card);
    margin-bottom: 0.5rem;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out;
  }

  li:hover {
    background-color: var(--color-background-hover);
  }

  li a {
    display: block;
    padding: 1rem;
    color: var(--color-text-primary);
    text-decoration: none;
  }

  @media (max-width: 600px) {
    .search-input{
      width: 85%;
    }
  }
</style>
