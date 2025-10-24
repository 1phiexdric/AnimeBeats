<script>
 let {anime} = $props();
</script>
<a href="/anime/{anime.id}">
<article>
    <figure>
        <img src={anime.coverImage.extraLarge} alt="portada del anime"/>
        <figcaption class="inter" translate="no">
            {anime.title.romaji}
        </figcaption>
    </figure>
</article>
</a>

<style>
article {
    width: 150px; /* Larger card */
    height: 240px;
    background-color: var(--color-background-card);
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

article:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

figure {
    width: 100%;
    height: 100%;
    margin: 0;
    position: relative;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

article:hover img {
    transform: scale(1.05);
}

figcaption {
    color: var(--color-text-primary);
    font-weight: 600;
    font-size: 0.9rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    padding: 1.5rem 0.5rem 0.5rem;
    transition: opacity 0.3s ease;
}

article:hover figcaption {
    opacity: 0;
}
@media(width < 720px){
    article{
      width: 130px; /* Larger card */
    height: 200px;  
    }
}
</style>