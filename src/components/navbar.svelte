<script>
	import Search from "./search.svelte";
	let showSearch = $state(false)
	function showSearchInput() {
		// Lógica para mostrar el input de búsqueda
		showSearch = !showSearch
	}
</script>
<aside>
    <h2 class="inter">AnimeBeats</h2>
    <hr>
    <nav>
        <ul>
            <a href="/"><li><i class="fa-solid fa-house verde"></i>Inicio</li></a>
            <li onclick={showSearchInput}><i class="fa-solid fa-magnifying-glass verde"></i>Buscar</li>
            <li><i class="fa-solid fa-star verde"></i>Favoritos</li>
            <li><i class="fa-solid fa-list"></i>Mi lista</li>
            <li><i class="fa-solid fa-music"></i>OPs Favoritos</li>
        </ul>
    </nav>
    <div class="tu_perfil">
        <!-- <img src="/favicon.svg" alt="logo de la pagina"> -->
        <span>Tu perfil</span>
    </div>
 </aside>
	<!-- Aquí iría el input de búsqueda -->
	<Search {showSearch} on:close={() => showSearch = false}/>
<style>
    aside {
		min-width: 220px;
		width: 220px;
		height: 100%;
		background-color: var(--color-background-sidebar);
		color: var(--color-text-secondary);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
	}
	h2 {
		color: var(--color-text-primary);
		font-size: 1.8rem;
		text-align: center;
		padding-bottom: 1.5rem;
	}
	hr {
		border: none;
		border-top: 1px solid var(--color-border);
		margin-bottom: 1.5rem;
	}
	nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	nav ul li {
		padding: 0.8rem 1rem;
		border-radius: 8px;
		transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
		cursor: pointer;
		display: flex;
		align-items: center;
		font-weight: 500;
	}
	nav ul li i {
		margin-right: 1rem;
		width: 20px; /* Align icons */
		text-align: center;
	}
	nav ul li:hover {
		background-color: var(--color-background-hover);
		color: var(--color-text-primary);
		transform: translateX(5px);
	}
	.verde {
		color: var(--color-accent);
	}
	.tu_perfil {
		margin-top: auto; /* Pushes to the bottom */
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		padding: 0.8rem;
		border-radius: 8px;
		transition: background-color 0.3s ease;
	}
	.tu_perfil:hover {
		background-color: var(--color-background-hover);
	}
	.tu_perfil img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: #ccc; /* Placeholder */
	}
	
</style>