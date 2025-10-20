import type { PageLoad } from './$types';

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

export const load: PageLoad = async ({ params }) => {
  const { id } = params;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables: { id } })
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    return data.data.Media;
  } catch (err) {
    console.error('Error al obtener datos de AniList:', err);
    throw new Error('Failed to fetch anime data');
  }
};