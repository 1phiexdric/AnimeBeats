<script lang="ts">
    export let data;
</script>

<section class="anime-details-container" style="--anime-color: {data.coverImage.color}">
    <div class="banner-container">
        <img src={data.bannerImage} alt="{data.title.english} banner" class="banner-image">
    </div>
    <div class="details-content">
        <div class="cover-image-container">
            <img src={data.coverImage.extraLarge} alt="{data.title.english} cover" class="cover-image">
        </div>
        <div class="main-info">
            <h1 class="inter">{data.title.english}</h1>
            <div class="genres">
                {#each data.genres as genre}
                    <span class="genre">{genre}</span>
                {/each}
            </div>
            <h2 class="inter">Description</h2>
            <div class="description">{@html data.description}</div>
            <div class="additional-info">
                <p><strong>Episodes:</strong> {data.episodes}</p>
                <div>
                    <strong>Studios:</strong>
                    <ul>
                        {#each data.studios.nodes as studio}
                            <li>{studio.name}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .anime-details-container {
        background: linear-gradient(to bottom, var(--anime-color, #333), #1a1a1a 80%);
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
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }

    .main-info {
        flex-grow: 1;
    }

    h1 {
        font-size: 2.8rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .genres {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .genre {
        background-color: rgba(255,255,255,0.1);
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
        background-color: rgba(0,0,0,0.2);
        padding: 1rem;
        border-radius: 8px;
    }

    ul {
        list-style-type: none;
        padding-left: 0;
    }
</style>