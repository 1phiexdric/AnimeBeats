import type { Actions } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// utils
import { buildBatchQuery } from "$lib/server/anilist_utils";
import { da, th } from "zod/locales";

const ANILIST_URL = "https://graphql.anilist.co";

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("refreshToken", { path: "/" });
    cookies.delete("accessToken", { path: "/" });

    redirect(303, "/");
  },
} satisfies Actions;

export const load: PageServerLoad = async ({ fetch, params }) => {
  try {
    const { id } = params;
    const response = await fetch(`/api/fav/${id}`);
    const data = await response.json();
    if(!data.animes || data.animes.length === 0){
      return{
        animes: [],
        canciones: data.canciones|| [],
      }
    }
    const query = buildBatchQuery(data.animes);
    const anilistResponse = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const result = await anilistResponse.json()

    const bacthData = result.data;
    
    const animes = Object.keys(bacthData).map(key => {
    const anime = bacthData[key];
    return {
        id: anime.id,
        title: { romaji: anime.title.romaji, english: anime.title.english },
        coverImage: {extraLarge: anime.coverImage.extraLarge}
    };})
    return {
      animes: animes,
      canciones: data.canciones,
    };
  } catch (e) {
    // 💡 SOLUCIÓN: Devuelve un objeto plano que contenga la información de error.
    // Esto evita el 500 de SvelteKit y te permite manejar el error en +page.svelte.
    console.error("Error en PageServerLoad:", e);

    // Usamos el mensaje del error o un mensaje predeterminado
    return {
      error: true,
      errorMessage: e instanceof Error ? e.message : "Un error desconocido ocurrió al cargar los datos.",
      animes: [],
      canciones: [],
    };
  }
};

