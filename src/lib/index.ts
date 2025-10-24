// ...existing code...

// Pide 30 animes (page 1, perPage 30)
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
  }
}

export { fetchAniListPage };
// ...existing code...