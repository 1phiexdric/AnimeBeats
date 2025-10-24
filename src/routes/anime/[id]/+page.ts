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
    // --- Fetch 1: Get the main anime details from AniList ---
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

    // --- Fetch 2: Get the anime themes from our own MongoDB API ---
    const themeResponse = await fetch(`/anime/${id}/themes`);
    const animeThemes = await themeResponse.json();

    // --- Return both datasets combined ---
    return {
      animeDetails,
      animeThemes
    };

  } catch (err) {
    console.error('Error in page load function:', err);
    // Return a safe object so the frontend doesn't crash
    return {
      animeDetails: null,
      animeThemes: { openings: [], endings: [] }
    };
  }
};