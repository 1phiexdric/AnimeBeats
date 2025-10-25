import { writable } from "svelte/store";

/**
 * Representa el estado del reproductor de video, incluyendo el ID del video actual y el estado de reproducción.
 * Se utiliza para gestionar y rastrear el estado del reproductor dentro de la aplicación.
 */
export type PlayerState = {
    videoId: string | null;
    isPlaying: boolean
}

const initialState: PlayerState = {
    videoId: null,
    isPlaying: false
}

const {subscribe, set, update} = writable<PlayerState>(initialState)

function playVideo(videoId: string){
    update(state=>({
        ...state,
        videoId: videoId,
        isPlaying: true
    }))
}

function togglePlayPause(){
    update(state=>({
        ...state,
        isPlaying: !state.isPlaying
    }))
}
function reset(){
    set(initialState)
}
export const playerStore = {
    subscribe, playVideo, togglePlayPause, reset
}