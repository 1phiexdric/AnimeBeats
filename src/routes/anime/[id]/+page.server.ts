import type { PageServerLoad} from './$types';
import { playerStore } from '$lib/store/playerStore';
import { getFavoritesCollection } from '$lib/server/mongo';


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

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
  playerStore.reset()
  const { id } = params;

  try {
    // 1: Obtener los detalles principales del anime de AniList ---
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

    // 2: Obtener los temas de anime de nuestra propia API de MongoDB ---
    let animeThemes = { openings: [], endings: [] }; // Default value
    const themeResponse = await fetch(`/anime/${id}/themes`);
    if (themeResponse.ok) {
      animeThemes = await themeResponse.json();
    } else {
      // Registrar una advertencia pero no bloquear la página
      console.warn(`Themes not found for anime ID ${id} (status: ${themeResponse.status}), proceeding without them.`);
    }

    // 3: ver si al usuario le gusta este anime ---
    
    const userId = locals.user?._id
    let isliked = false;
    if(userId){
      const collection = await getFavoritesCollection()
      const favoriteEntry = await collection.findOne({ userId: userId, animes: {$in: [Number(id)]}}, { projection: { _id: 1 } });
      isliked = (favoriteEntry !== null)
    }
    
    return {
      id,
      isliked,
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