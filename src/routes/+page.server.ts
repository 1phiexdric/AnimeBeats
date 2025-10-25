import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

const query = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        english,
        romaji
      }
      coverImage {
        extraLarge
      }
    }
  }
}
`;


const url = 'https://graphql.anilist.co';

async function fetchAniListPage(page: number, perPage: number) {
    const variables = { page: page, perPage: perPage };
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query, variables })
      };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();


    return data;
  } catch (err) {
    console.error('Error al obtener datos de AniList:', err);
    throw err;
  }
}

export const load: PageServerLoad = async({setHeaders})=>{
    setHeaders({
        'cache-control': 'public, max-age=600'
    })
    try {
        const animes = await fetchAniListPage(1, 12)
        return {
            animes: animes.data.Page.media
        }
    } catch (err) {
        throw error(500, 'Internal Server Error');
    }
}

export { fetchAniListPage };