import { writable } from "svelte/store";

type UserSession = {
  _id: string;
  email: string;
  username: string;
};

// El store sigue igual de bien definido
export const userStore = writable<UserSession | null>(null)