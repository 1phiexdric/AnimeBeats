import { writable } from "svelte/store";

export type Track = {
    title: string;
    artist: string;
    audioUrl: string;
}

export type PlayerState = {
    currentTrack: Track | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number// 0 y 1
}

const initialState: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1
}

const {subscribe, set, update} = writable<PlayerState>(initialState)

function playTrack(track: Track){
    update(state => ({
        ...state,
        currentTrack: track,
        isPlaying: true,
        currentTime: 0,
        duration: 0
    }))
}

function togglePlayPause(){
    update(state=>({
        ...state,
        isPlaying: !state.isPlaying
    }))
}

function seek(time: number){
    update(state => ({
        ...state,
        currentTime: time
    }))
}

function setVolume(level: number){
    update(state => ({
        ...state,
        volume: Math.max(0, Math.min(1, level))
    }))
}

export const playerStore = {
    subscribe,
    playTrack,
    togglePlayPause,
    seek,
    setVolume
}