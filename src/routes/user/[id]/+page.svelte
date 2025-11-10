<script lang="ts">
	import { userStore } from "$lib/store/userStore";
	let activeTab: 'animes' | 'songs' = $state('animes');
	let fecha: Date | undefined = $state()
	if($userStore?.create_at){
		fecha = new Date($userStore?.create_at)
		fecha = fecha.toLocaleDateString('es', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		})
	}
	
</script>

<section class="main">
	<div class="banner">
		<form action="?/logout" method="post">
		<button class="log-out"><i class="fa-solid fa-right-from-bracket"></i>
		log out</button></form>
		<div class="user-img-container">
			<img src="/user.jpg" alt="Foto de perfil del usuario" />
			<div class="user-info">
				<h2 id="user-name" class="oswald">{$userStore?.username}</h2>
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
				onclick={() => (activeTab = 'animes')}
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
				<p>Aquí se mostrarán los animes favoritos.</p>
			{:else}
				<p>Aquí se mostrarán las canciones favoritas.</p>
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
	.log-out{
		position: absolute;
		right: 20px;
		top: 20px;
		color: blacks;
		background-color: white;
		transition: all 300ms ease-in-out;
		padding: 5px 10px;
		border-radius: 8px;
		border: 3px solid #ff4d4d;
	}
	.log-out:hover{
		color: #ff4d4d;
		background-color: black;
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
	}
</style>