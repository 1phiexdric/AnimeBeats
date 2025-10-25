<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { playerStore } from "$lib/store/playerStore";
    import { loadYouTubeAPI } from "$lib/youtube"; // Importamos el nuevo gestor

    let player: YT.Player | undefined;
    let playerReady = false;

    onMount(async () => {
        try {
            // Esperamos a que la API esté lista de forma segura
            await loadYouTubeAPI();

            // Creamos el reproductor una vez que la API está disponible
            player = new YT.Player('youtube-player-div', {
                height: '100%', // Usamos 100% para que se ajuste al contenedor
                width: '100%',
                playerVars: {
                    controls: 1,
                    disablekb: 1,
                    iv_load_policy: 3,
                    modestbranding:1,
                    showinfo: 0,
                    rel: 0, // No mostrar videos relacionados al final
                    enablejsapi: 1, // Habilitar la API de JavaScript
                    origin: window.location.origin // Origen para la seguridad
                },
                events: {
                    'onReady': () => { 
                        playerReady = true;
                        // Si ya hay un video en el store cuando el reproductor está listo, lo cargamos
                        if ($playerStore.videoId) {
                            player?.loadVideoById($playerStore.videoId);
                        }
                    },
                }
            });
        } catch (error) {
            console.error("Error initializing YouTube player:", error);
        }
    });

    // Reacciona a los cambios de videoId en el store
    $: if (playerReady && $playerStore.videoId && player) {
        // Comprobamos si el video actual es diferente al que queremos cargar
        if (player.getVideoData().video_id !== $playerStore.videoId) {
            player.loadVideoById($playerStore.videoId);
        }
    }

    // Reacciona a los cambios de estado de reproducción en el store
    $: if (playerReady && player) {
        if ($playerStore.isPlaying) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    }

    // ¡CRUCIAL! Limpiamos el reproductor al destruir el componente
    onDestroy(() => {
        (player as any)?.destroy();
    });
</script>

<div class="player-wrapper">
  <div id="youtube-player-div" class="player"></div>
</div>

<style>
  .player-wrapper{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    padding:1rem 0;
  }
  .player {
    width:100%;
    max-width: 900px; /* ajusta según prefieras */
    aspect-ratio: 16 / 9; /* mantiene 16:9 */
    background: #000;
  }
</style>