import { writable } from "svelte/store";

/**
 * Represents the state of the video player, including the current video ID and playback status.
 * Used to manage and track player state within the application.
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

export const playerStore = {
    subscribe, playVideo, togglePlayPause
}