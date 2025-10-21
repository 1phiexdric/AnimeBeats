<script lang="ts">
  import ThemeCard from '../../../components/themeCard.svelte';

  export let data;
  let { animeDetails, animeThemes } = data;
  console.log(animeThemes);
</script>

{#if animeDetails}
  <section
    class="anime-details-container"
    style="--anime-color: {animeDetails.coverImage.color}"
  >
    <div class="banner-container">
      <img
        src={animeDetails.bannerImage}
        alt="{animeDetails.title.english} banner"
        class="banner-image"
      />
    </div>
    <div class="details-content">
      <div class="cover-image-container">
        <img
          src={animeDetails.coverImage.extraLarge}
          alt="{animeDetails.title.english} cover"
          class="cover-image"
        />
      </div>
      <div class="main-info">
        <h1 class="inter">{animeDetails.title.english}</h1>
        <div class="genres">
          {#each animeDetails.genres as genre}
            <span class="genre">{genre}</span>
          {/each}
        </div>
        <h2 class="inter">Description</h2>
        <div class="description">{@html animeDetails.description}</div>
        <div class="additional-info">
          <p><strong>Episodes:</strong> {animeDetails.episodes}</p>
          <div>
            <strong>Studios:</strong>
            <ul>
              {#each animeDetails.studios.nodes as studio}
                <li>{studio.name}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
<section class="themes-section">
  <h2 class="inter">Themes</h2>
  <div class="themes-grid">
    <div class="theme-list">
      <h3>Openings</h3>
      {#if animeThemes.openings}
      {#each animeThemes.openings as op}
        <ThemeCard {...op} />
      {/each}
      {:else}
        <p>No openings found.</p>
      {/if}
    </div>
    <div class="theme-list">
      <h3>Endings</h3>
      {#if animeThemes.endings}
      {#each animeThemes.endings as ed}
        <ThemeCard {...ed} />
      {/each}
      {:else}
        <p>No openings found.</p>
      {/if}
    </div>
  </div>
</section>
{:else}
  <p class="inter" style="text-align: center; padding: 2rem;">
    Anime not found or failed to load.
  </p>
{/if}

<style>
  .anime-details-container {
    background: linear-gradient(
      to bottom,
      var(--anime-color, #333),
      #1a1a1a 80%
    );
    color: #fff;
    padding-bottom: 2rem;
  }

  .banner-image {
    width: 100%;
    height: 350px;
    object-fit: cover;
    opacity: 0.5;
  }

  .details-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: -150px auto 0;
    position: relative;
  }

  @media (min-width: 768px) {
    .details-content {
      flex-direction: row;
    }
  }

  .cover-image-container {
    flex-shrink: 0;
  }

  .cover-image {
    width: 225px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  .main-info {
    flex-grow: 1;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .genres {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .genre {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.3rem 0.7rem;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid var(--anime-color, #fff);
    padding-bottom: 0.3rem;
  }

  .description {
    line-height: 1.6;
  }

  .additional-info {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .additional-info p,
  .additional-info div {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 8px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }
  /* New styles for themes section */
  .themes-section {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: #fff;
  }

  .themes-section h2 {
    border-bottom-color: #555;
  }

  .themes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .themes-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .theme-list h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .theme-list ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .theme-list li {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .theme-list a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.3rem 0.7rem;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  .theme-list a:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
