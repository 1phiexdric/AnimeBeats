import { json } from "@sveltejs/kit";

async function fetchAniListSearch(searchTerm: string) {
    const query = `
      query ($search: String) {
        Page(perPage: 8) { # Aumentamos un poco el número de sugerencias
          media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              english
              romaji
            }
          }
        }
      }
    `;

    const variables = {
        search: searchTerm
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Si la respuesta HTTP no es 200, lanza un error
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching from AniList API:", error);
        // Si hay un error de red o al hacer fetch, lanza el error para que sea capturado arriba
        throw error;
    }
}

export async function GET({ url }) {
    const searchTerm = url.searchParams.get('query') || '';

    try {
        if (!searchTerm || searchTerm.length < 3) {
            return json([]); 
        }

        const results = await fetchAniListSearch(searchTerm);

        // IMPORTANTE: Revisa si la respuesta de GraphQL tiene un array de 'errors'
        if (results.errors) {
            console.error('GraphQL Errors:', results.errors);
            // Si hay errores de GraphQL, no podemos confiar en los datos.
            return json({ error: 'Error from GraphQL API' }, { status: 500 });
        }

        const animes = results?.data?.Page?.media || [];

        return json(animes);

    } catch (err: any) {
        console.error("Error in search endpoint:", err);
        return json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}