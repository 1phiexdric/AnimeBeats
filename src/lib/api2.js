/**
 * Example function to fetch a list of anime names from the AnimeThemes GraphQL API.
 */
export async function getAnimeListExample() {
    const url = "https://graphql.animethemes.moe/";
    const variables = {
        search: "Solo Leveling"
    }
    
    // Consulta GraphQL corregida
    const graphqlQuery = `
      query ($search: String!) {
        search(search: $search) {
          anime {
            name
            animethemes {
              slug
              type
              song {
                title
              }
              
              # CORRECCIÓN 1: El artista/banda está en 'group',
              # que es un campo de 'AnimeTheme'.
              group {
                name
              }
              
              # CORRECCIÓN 2: 'animethemeentries' es una LISTA,
              # no una conexión (quitamos 'nodes').
              animethemeentries {
                # 'videos' SÍ es una conexión.
                videos {
                  nodes {
                    basename
                    link
                    path
                    resolution
                    source
                  }
                }
              }
            }
          }
        }
      }
    `

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables
        })
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error("GraphQL Errors:", data.errors);
            return []; 
        }

        return data; 

    } catch (error) {
        console.error("Error fetching anime list:", error);
        return []; 
    }
}
const result = await getAnimeListExample()
console.log(JSON.stringify(result, null, 2));