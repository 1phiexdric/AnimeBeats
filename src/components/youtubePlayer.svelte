<script lang="ts">
    import { onMount } from "svelte";
    import { playerStore } from "$lib/store/playerStore";

    let player: YT.Player;
    let playerReady = false;


    onMount(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);

        (window as any).onYouTubeIframeAPIReady = () => {
            player = new YT.Player('youtube-player-div', {
                height: '390',
                width: '640',
                events: {
                    'onReady': () => { playerReady = true },
                }
            });
        };
    });

    $: if (playerReady && $playerStore.videoId) {
        // Only load video if it's a different video to avoid unnecessary reloads
        if (player.getVideoData().video_id !== $playerStore.videoId) {
            player.loadVideoById($playerStore.videoId);
        }
    }

    $: if (playerReady) {
        if ($playerStore.isPlaying) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    }
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
  /* Forzar que el iframe ocupe todo el contenedor cuando la API lo inyecte */
  #youtube-player-div iframe {
    width: 100% !important;
    height: 100% !important;
  }
</style>