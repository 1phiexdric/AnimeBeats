import type { PageLoad } from './$types';
import { playerStore } from '$lib/store/playerStore';
const query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    description(asHtml: false)
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    averageScore
    episodes
    genres
    studios {
      nodes {
        name
      }
    }
  }
}
`;

const url = 'https://graphql.anilist.co';

export const load: PageLoad = async ({ params, fetch }) => {
  playerStore.reset()
  const { id } = params;

  try {
    // --- Fetch 1: Obtener los detalles principales del anime de AniList ---
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables: { id } })
    };

    const detailsResponse = await fetch(url, options);
    if (!detailsResponse.ok) throw new Error(`Failed to fetch from AniList: ${detailsResponse.statusText}`);
    const detailsData = await detailsResponse.json();
    const animeDetails = detailsData.data.Media;

    if (!animeDetails) {
      throw new Error('Anime details not found in AniList response');
    }

    // --- Fetch 2: Obtener los temas de anime de nuestra propia API de MongoDB ---
    let animeThemes = { openings: [], endings: [] }; // Default value
    const themeResponse = await fetch(`/anime/${id}/themes`);
    if (themeResponse.ok) {
      animeThemes = await themeResponse.json();
    } else {
      // Registrar una advertencia pero no bloquear la página
      console.warn(`Themes not found for anime ID ${id} (status: ${themeResponse.status}), proceeding without them.`);
    }

    // --- Devolver ambos conjuntos de datos combinados ---
    return {
      id,
      animeDetails,
      animeThemes
    };

  } catch (err) {
    console.error('Error in page load function:', err);
    // Devolver un objeto seguro para que el frontend no se bloquee
    return {
      animeDetails: null,
      animeThemes: { openings: [], endings: [] }
    };
  }
};