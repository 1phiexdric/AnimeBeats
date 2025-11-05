<script>
  import Search from "./search.svelte";
  let showSearch = $state(false);
  let showMenu = $state(false);
  function showSearchInput() {
    // Lógica para mostrar el input de búsqueda
    showSearch = !showSearch;
  }
</script>

<div class="main">
	
	<div class="btn-div">
		<button
		onclick={() => (showMenu = !showMenu)}
		aria-label="Abrir menú lateral"
		>
		<i class="fa-solid fa-bars"></i>
    </button>
</div>
</div>
<aside class:open={showMenu}>
	<h2 class="oswald" translate="no">AnimeBeats</h2>
  <hr />
  <nav>
    <ul>
      <a href="/" onclick={()=>{showMenu = !showMenu}}><li><i class="fa-solid fa-house verde"></i>Inicio</li></a>
      <li onclick={()=>{showSearchInput(); showMenu = !showMenu}}>
        <i class="fa-solid fa-magnifying-glass verde"></i>Buscar
      </li>
      <li translate="no" onclick={()=>{showMenu = !showMenu}}><a href="/about"><i class="fa-solid fa-circle-info verde"></i>Acerca de</a></li>
      <!-- <li><i class="fa-solid fa-star verde"></i>Favoritos</li>
      <li><i class="fa-solid fa-list"></i>Mi lista</li>
      <li><i class="fa-solid fa-music"></i>OPs Favoritos</li> -->
    </ul>
  </nav>
  <div class="botton-content">
    <div class="gtranslate_wrapper"></div>
    <a href="/user" class="tu_perfil" onclick={()=>{showMenu = !showMenu}} >
    <img src="/user.jpg" alt="logo de la pagina">
    <span>Tu perfil</span>
  </a>
  </div>
</aside>
<!-- Aquí iría el input de búsqueda -->
<Search {showSearch} on:close={() => (showSearch = false)} />

<style>
  .main {
    display: none; /* Oculto por defecto */
    position: fixed; /* Fijado en la parte superior */
    top: 0;
    left: 0;
    z-index: 1001; /* Por encima de todo menos el menú abierto */
    background: var(--color-background-sidebar);
    width: 100%;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid var(--color-border);
    font-size: 1.5rem; /* Tamaño de ícono ajustado */
  }
  aside {
    min-width: 220px;
    width: 220px;
    height: 100%;
    background-color: var(--color-background-sidebar);
    color: var(--color-text-secondary);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    border-right: 2px solid var(--color-border);
    transition: transform 0.3s ease-in-out; /* Transición para el deslizamiento */
  }
  h2 {
    color: var(--color-text-primary);
    font-size: 1.8rem;
    text-align: center;
    padding-bottom: 1.5rem;
    font-weight: 500;
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
  nav ul a {
    text-decoration: none;
    color: inherit;
  }
  nav ul li {
    padding: 0.8rem 1rem;
    border-radius: 8px;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease,
      color 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
  nav ul li i {
    margin-right: 1rem;
    width: 20px; /* Alinear íconos */
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
  .botton-content{
    margin-top: auto;
  }
  .gtranslate_wrapper{
    display: flex;
    justify-content: center;
  }
  .tu_perfil {
    margin-top: auto; /* Empuja hacia abajo */
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
    background-color: #ccc; /* Marcador de posición */
  }

  /* --- RESPONSIVE STYLES --- */
  @media (max-width: 768px) {
    .main {
      display: flex; /* Muestra la barra superior en móvil */
    }
    aside {
      position: fixed; /* Lo saca del flujo normal */
      left: 0;
      top: 0;
      z-index: 1002; /* Por encima de la barra superior */
      transform: translateX(-100%); /* Oculto fuera de la pantalla por defecto */
    }
    aside.open {
      transform: translateX(0); /* Lo trae a la vista cuando tiene la clase .open */
    }
  }
</style>
