<script>
	let showVolume = false;
</script>

<footer class="player-container">
	<div class="track-info">
		<p class="title">Titulo</p>
		<p class="artist">artista</p>
	</div>

	<button class="control-button play-button">
		{#if true}
			<i class="fa-solid fa-pause"></i>
		{:else}
			<i class="fa-solid fa-play"></i>
		{/if}
	</button>

	<div class="progress-bar-container">
		<span>0:00</span>
		<input type="range" class="progress-bar" min="0" max="300" />
		<span>3:00</span>
	</div>

	<div class="volume-control">
		<button class="control-button" on:click={() => (showVolume = !showVolume)}>
			<i class="fa-solid fa-volume-high"></i>
		</button>
		{#if showVolume}
			<div class="volume-slider-container">
				<input type="range" class="volume-slider" min="0" max="1" step="0.01" />
			</div>
		{/if}
	</div>
</footer>

<style>
	.player-container {
		background-color: var(--color-background-sidebar);
		color: var(--color-text-primary);
		padding: 0 1.5rem;
		height: 60px; /* Reduced height */
		border-top: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		gap: 1.5rem;
		position: sticky;
		bottom: 0;
		width: 100%;
	}

	.track-info {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.track-info .title {
		font-weight: 600;
		margin: 0;
		color: var(--color-accent); /* Green title */
		font-size: 1rem; /* Increased font size */
	}
	.track-info .artist {
		font-size: 0.85rem; /* Increased font size */
		color: var(--color-text-secondary);
		margin: 0;
	}

	.control-button {
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: 1rem;
		cursor: pointer;
		transition: color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.control-button:hover {
		color: var(--color-text-primary);
	}
	.play-button {
		background-color: var(--color-text-primary);
		color: var(--color-background-main);
		width: 36px;
		height: 36px;
		border-radius: 50%;
		font-size: 1rem;
	}
	.play-button:hover {
		transform: scale(1.05);
		color: var(--color-background-main);
	}

	.progress-bar-container {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		width: 30vw;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: 100%;
	}

	/* Track */
	input[type='range']::-webkit-slider-runnable-track {
		background: var(--color-border);
		height: 4px; /* Thinner track */
		border-radius: 4px;
	}
	input[type='range']::-moz-range-track {
		background: var(--color-border);
		height: 4px;
		border-radius: 4px;
	}

	/* Thumb */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: -4px; /* Adjusted margin */
		background-color: var(--color-text-primary);
		height: 12px; /* Smaller thumb */
		width: 12px; /* Smaller thumb */
		border-radius: 50%;
		transition: background-color 0.2s;
	}
	input[type='range']::-moz-range-thumb {
		background-color: var(--color-text-primary);
		height: 12px;
		width: 12px;
		border-radius: 50%;
		border: none;
		transition: background-color 0.2s;
	}

	input[type='range']:hover::-webkit-slider-thumb {
		background-color: var(--color-accent);
	}
	input[type='range']:hover::-moz-range-thumb {
		background-color: var(--color-accent);
	}

	.volume-control {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
	}

	.volume-slider-container {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--color-background-card);
		padding: 1rem 0.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.volume-slider {
		writing-mode: vertical-lr;
		height: 100px;
		width: 4px; /* Match track thickness */
	}
</style>