<script lang="ts">
	// types
	import type { PageData } from "../$types";
	import type { SubmitFunction } from '@sveltejs/kit';
	// Svelte/sveltekit
	import { onDestroy } from "svelte";
	import { slide } from 'svelte/transition';
	import { enhance,applyAction } from "$app/forms";
	import { invalidateAll} from "$app/navigation";
	// Stores
	import { userStore } from "$lib/store/userStore";
	import { playerStore } from "$lib/store/playerStore";
	
	// components
	import YoutubePlayer from "../../../components/youtubePlayer.svelte";
	import ThemeCard from "../../../components/themeCard.svelte";

	let activeTab: 'animes' | 'songs' = $state('animes');
	let fecha: Date | string = $state("")
	let {data } = $props() as {data: PageData}
	let { user} = data
	if(user?.create_at){
		fecha = new Date(user.create_at)
		fecha = fecha.toLocaleDateString('es', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		})
	}
	let animes= $state(data.animes)
	let canciones = $state(data.canciones)
	onDestroy(()=>{
		playerStore.reset()
	})
	async function deleteAnime(userId: string| undefined,animeId: string | number){
		
		const response = await fetch(`/api/fav/${userId}/animes/${animeId}`, {
			method: "DELETE",
		})
		
		if(!response.ok){
			console.error("Error al eliminar el anime de favoritos");
			return
		}
		animes = animes.filter((anime) => anime.id != animeId);
	}
	const handleLogout : SubmitFunction =()=>{
		return async ({ result }) => {
          await invalidateAll();
          await applyAction(result);
			}
	}
	// Eliminar canción de la UI después de borrarla
	function deleteSongUi(enlace: string){// props para themeCard
		canciones = canciones.filter((c)=> c.enlace_youtube != enlace)
	}
</script>

<section class="main">
	<div class="banner">
		<form action="?/logout" method="post" use:enhance={handleLogout}>
		<button class="log-out"><i class="fa-solid fa-right-from-bracket"></i>
		log out</button></form>
		<div class="user-img-container">
			<img src="/user.jpg" alt="Foto de perfil del usuario" />
			<div class="user-info">
				<h2 id="user-name" class="oswald">{user?.username}</h2>
				<p class="user-date">Miembro desde {fecha}</p>
			</div>
		</div>
		<div class="edit-profile-container">
			<button class="btn edit-profile-btn"> Editar Perfil </button>
		</div>
	</div>
	<div class="profile-content">
		<div class="btn-container">
			<button
				class="btn-tab"
				class:active={activeTab === 'animes'}
				onclick={() => {
					(activeTab = 'animes')
			playerStore.reset()}}
			>
				Animes Favoritos
			</button>
			<button
				class="btn-tab"
				class:active={activeTab === 'songs'}
				onclick={() => (activeTab = 'songs')}
			>
				Canciones Favoritas
			</button>
		</div>
		<section class="favs">
			{#if activeTab === 'animes'}
			{#if animes.length > 0}
			<ul class="favorites-animes-list">
				{#each animes as anime}
				<li class="favorites-animes-list-elements" out:slide={{duration:200}}>
					<img src={anime.coverImage.extraLarge} alt="" class="favorites-animes-list-imgs">
					<div class="favorites-animes-list-content">
						<h3 class="oswald" translate="no">{anime.title.romaji}</h3>
						<div class="favorites-animes-list-content-down">
							<a href={`/anime/${anime.id}`} style="display: contents;">
								Ver Detalles
							</a>
							<button class="favorites-delete-btn" aria-label="borrar" onclick={()=>deleteAnime($userStore?._id, anime.id)}><p>Borrar de favoritos</p></button>
						</div>
					</div>
				</li>
				{/each}
			</ul>
				
			{:else}
				<p>Aquí se mostrarán los animes favoritos.</p>
			{/if}
				{:else}
				{#if canciones.length > 0}
					<!-- <ThemeCard {...canciones}/> -->
					{#each canciones as cancion }
						<ThemeCard {...cancion} onDelete={()=>deleteSongUi(cancion.enlace_youtube)}/>
					{/each}
					<YoutubePlayer/>
				{:else}
				<p>Aquí se mostrarán las canciones favoritas.</p>
				{/if}
				{/if}
		</section>
	</div>
	
</section>

<style>
	.main {
		padding-bottom: 50px;
	}
	.banner {
		background: linear-gradient(to right, var(--color-accent), #ff8a00);
		color: black;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 220px;
		padding: 0 2rem;
		position: relative;
	}
	.user-img-container {
		display: flex;
		align-items: flex-end;
		gap: 20px;
	}
	.user-img-container img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		border: 5px solid white;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		object-fit: cover;
	}
	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 15px;
	}

	#user-name {
		font-size: 3rem;
		font-weight: 700;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
	}
	.user-date {
		font-weight: 400;
		font-size: 1rem;
		color: #ffffff;
	}

	.profile-content {
		margin-top: 80px; /* Replaces separator */
		padding: 0 2rem;
	}

	.favs {
		margin-top: 20px; /* Replaces separator */
		min-height: 200px;
		border-radius: 8px;
		padding: 1rem;
	}
	.favs p {
		color: var(--color-text-secondary);
		text-align: center;
		margin-top: 2rem;
		font-style: italic;
	}

	.btn {
		border: none;
		padding: 10px 20px;
		border-radius: 8px;
		transition: all 300ms ease-in-out;
		background: white;
		color: var(--color-primary);
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}
	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}

	.edit-profile-btn {
		background-color: transparent;
		border: 2px solid black;
		color: black;
		font-weight: 700;
	}

	.edit-profile-btn:hover {
		background-color: black;
		color: white;
	}

	.btn-container {
		display: flex;
		justify-content: center;
		border-bottom: 1px solid var(--color-border, #ddd);
	}

	.btn-tab {
		padding: 10px 30px;
		border: none;
		border-bottom: 3px solid transparent;
		text-transform: uppercase;
		background: none;
		color: var(--color-text-secondary);
		font-weight: 600;
		transition: all 0.3s ease;
		cursor: pointer;
		margin-top: 0;
		border-radius: 0;
		margin-bottom: -1px; /* Aligns with the container border */
	}

	.btn-tab:hover {
		color: var(--color-text-primary);
	}

	.btn-tab.active {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
	}
	/* --- Botón de Logout Mejorado --- */
.log-out {
  position: absolute;
  right: 20px;
  top: 20px;
  border: 2px solid #ff4d4d;
  color: #ff4d4d;
  font-weight: 600;
  text-transform: uppercase; /* Opcional, pero da buen look */
  font-size: 0.8rem;
  transition: all 300ms ease-in-out;
  padding: 8px 12px; /* Padding más balanceado */
  border-radius: 8px;
  cursor: pointer;
  background-color: black;
}

.log-out:hover {
  background-color: #ff4d4d; /* Se rellena al hacer hover */
  color: white; /* Texto se vuelve blanco */
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
}

/* --- Lista de Animes Favoritos Mejorada --- */
.favorites-animes-list {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espacio limpio entre elementos */
}

.favorites-animes-list-elements {
  margin: 0; /* Quita el margen anterior */
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.favorites-animes-list-elements:hover {
  transform: translateY(-3px);
  
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.favorites-animes-list-imgs {
  width: 90px;
  height: 130px;
  object-fit: cover;
  /* Evita que la imagen se encoja */
  flex-shrink: 0;
}

.favorites-animes-list-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

.favorites-animes-list-content h3 {
  font-size: 1.5rem;
  margin: 0; /* Resetea margen */
}

.favorites-animes-list-content-down {
  display: flex;
  align-items: center;
  /* Separa "Ver Detalles" de "Borrar" */
  justify-content: space-between;
  margin-top: 1rem; /* Espacio desde el título */
}

/* Estilo para el enlace "Ver Detalles" */
.favorites-animes-list-content-down a {
  font-weight: 600;
  color: var(--color-accent); /* Usa el color principal de tu app */
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.favorites-animes-list-content-down a:hover {
  text-decoration: underline;
}

/* Estilo mejorado para el botón "Borrar" */
.favorites-delete-btn {
  /* Quita estilos de botón feos */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #ff4d4d;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none; /* Quita el underline feo */
  transition: opacity 0.2s ease;
}

.favorites-delete-btn p {
  color: inherit; /* Hereda el color rojo del botón */
  font-weight: inherit; /* Hereda el peso del botón */
  font-size: inherit; /* Hereda el tamaño del botón */
  margin: 0;
  padding: 0;
}

.favorites-delete-btn:hover {
  opacity: 0.7; /* Un hover sutil */
}

	@media (width < 800px) {
		.banner {
			flex-direction: column;
			height: auto;
			padding-bottom: 10px; /* Space for translated image */
			padding-top: 70px;
			text-align: center;
		}
		.user-img-container {/* Keep the overlap effect */
			margin-bottom: 0;
			flex-direction: column;
			align-items: center;
		}
		.user-img-container img {
			width: 150px;
			height: 150px;
		}
		.user-info {
			margin-top: 1rem;
			margin-bottom: 0;
			align-items: center;
		}
		#user-name {
			font-size: 2.5rem;
		}
		.profile-content {
			margin-top: 80px;
		}
        .edit-profile-container{
            margin: 10px;
        }
		.log-out{
		right: 10px;
		top: 50px;
	}
	}
	@media (width < 600px) {
		.banner {
			padding-bottom: 10px;
		}
		#user-name {
			font-size: 2rem;
		}
		.user-img-container img {
			width: 120px;
			height: 120px;
		}
		.btn-tab {
			padding: 10px 15px;
			font-size: 0.8rem;
		}
		.profile-content {
			padding: 0 1rem;
			margin-top: 70px;
		}
		.favorites-animes-list-content h3{
		font-size: 1.4rem;
	}
		.favorites-delete-btn p{
		font-size: 0.875rem;
	}
	}
</style>