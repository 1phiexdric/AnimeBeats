
import fs from 'fs/promises';

// 1. Define la consulta de GraphQL. 
// Pide varios detalles de un medio (anime) buscado por un término de búsqueda.
const query = `
query ($search: String) {
  Media (search: $search, type: ANIME) {
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

// 2. Define las variables para la consulta.
// Puedes cambiar 'Solo Leveling' por cualquier otro anime que quieras buscar.
const variables = {
  search: 'Solo Leveling'
};

// 3. Configura las opciones para la petición fetch.
const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables
  })
};

// 4. Realiza la petición a la API y maneja la respuesta.
async function fetchAniListData() {
  console.log(`Buscando datos para: "${variables.search}"...`);
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Datos recibidos con éxito!');
    
    // 5. Escribe la respuesta en un archivo JSON para que puedas verla.
    const outputPath = 'anilist-response.json'; // Se creará en la raíz del proyecto.
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log(`La respuesta de la API se ha guardado en: ${outputPath}`);
    
    return data;
  } catch (error) {
    console.error('Error al obtener datos de AniList:', error);
  }
}

// Ejecuta la función.
fetchAniListData();
