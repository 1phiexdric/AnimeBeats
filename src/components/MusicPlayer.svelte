<script lang="ts">
    import { playerStore } from "$lib/store/playerStore";
    let audioElement: HTMLAudioElement;
    $:if(audioElement){
        if($playerStore.isPlaying){
            audioElement.play()
        }else{
            audioElement.pause()
        }
    }

    function handlePlayPause(){
        playerStore.togglePlayPause()
    }
    function handleVolumeChange(e: Event){
        const newVolume = parseFloat((e.target as HTMLInputElement).value)
        playerStore.setVolume(newVolume)
    }
    function handleSeek(e: Event){
        const newTime = parseFloat((e.target as HTMLInputElement).value)
        playerStore.seek(newTime)
    }
    function formatTime(time: number){
        if(isNaN(time)) return '0:00';
        const minutes = Math.floor(time/ 60)
        const seconds = Math.floor(time % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }
</script>
{#if $playerStore.currentTrack}
  <audio
    src={$playerStore.currentTrack.audioUrl}
    bind:currentTime={$playerStore.currentTime}
    bind:duration={$playerStore.duration}
    bind:volume={$playerStore.volume}
    style="display: none"
  />
<footer class="player-container">
    <div class="track-info">
        <p class="title">{$playerStore.currentTrack.title}</p>
        <p class="artist">{$playerStore.currentTrack.artist}</p>
    </div>

    <div class="controls">
        <div class="buttons">
            <button class="control-button"><i class="fa-solid fa-backward-step"></i></button>
            <button class="control-button play-button" onclick={handlePlayPause}>
                {#if $playerStore.isPlaying}
                <i class="fa-solid fa-pause"></i>
                {:else}
                <i class="fa-solid fa-play"></i>
                {/if}
            </button>
            <button class="control-button">
                <i class="fa-solid fa-forward-step"></i>
            </button>
        </div>
        <div class="progress-bar-container">
            <span>{formatTime($playerStore
       .currentTime)}</span>
       <input type="range" class="progress-bar"
       min="0"
       max={$playerStore.duration}
       value={$playerStore.currentTime}
       oninput={handleSeek}>
       <span>{formatTime($playerStore
       .duration)}</span>
        </div>

        <div class="volume-control">
            <i class="fa-solid fa-volume-high"></i>
            <input type="range"
            class="valume-slider"
            min="0"
            max="1"
            step="0.01"
            value={$playerStore.volume}
            oninput={handleVolumeChange}>
        </div>
    </div>
</footer>
{/if}
<style>
     .player-container {
         background-color: #181818;
         color: #fff;
         padding: 0 1rem;
         height: 90px;
         border-top: 1px solid #282828;
         display: grid;
         grid-template-columns: 1fr 2fr 1fr;
         align-items: center;
         gap: 1rem;
         /* Esto lo saca del flujo normal y l pega abajo */
         position: sticky;
         bottom: 0;
         width: 100%;
     }

     .track-info {
         text-align: left;
     }
     .track-info .title {
         font-weight: 600;
         margin: 0;
     }
     .track-info .artist {
         font-size: 0.8rem;
         color: #b3b3b3;
         margin: 0;
     }

     .controls {
         display: flex;
         flex-direction: column;
         align-items: center;
         gap: 0.5rem;
     }
     .buttons {
         display: flex;
         gap: 1rem;
         align-items: center;
     }
     .control-button {
         background: none;
         border: none;
         color: #b3b3b3;
         font-size: 1rem;
         cursor: pointer;
         transition: color 0.2s;
     }
     .control-button:hover {
         color: #fff;
     }
     .play-button {
         background-color: #fff;
         color: #000;
         width: 32px;
         height: 32px;
         border-radius: 50%;
         font-size: 0.8rem;
     }
     .play-button:hover {
         transform: scale(1.05);
         color: #000;
     }

     .progress-bar-container {
         display: flex;
         align-items: center;
         gap: 0.5rem;
         width: 100%;
         font-size: 0.7rem;
         color: #b3b3b3;
     }
     .progress-bar, .volume-slider {
         flex-grow: 1;
     }

     .volume-control {
         display: flex;
         justify-content: flex-end;
         align-items: center;
         gap: 0.5rem;
     }
 </style>