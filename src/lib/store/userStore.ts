import { writable } from "svelte/store";

type UserSession = {
  _id: string;
  email: string;
  username: string;
  create_at: Date
};

// El store sigue igual de bien definido
export const userStore = writable<UserSession | null>(null)