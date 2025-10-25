import { json } from "@sveltejs/kit";
import { getTemasCollection } from "$lib/server/mongo";
import { buildBatchQuery } from "$lib/server/anilist_utils";

const ANILIST_URL = 'https://graphql.anilist.co';

export async function GET({url, setHeaders}): Promise<any> {
    setHeaders({
        'cache-control': 'public, max-age=600'
    });
    const tipo = url.searchParams.get('tipo')
    const collection = await getTemasCollection()
    let queryType = {}
    if(tipo){
        queryType = {tipo_animacion: tipo}
    }
    const temasCurados = await collection.find({
        ...queryType
    }).toArray()
    const ids = temasCurados.map((item: any) => item.anilist_id)
    
    const query = buildBatchQuery(ids)
    const anilistResponse = await fetch(ANILIST_URL, {
        method: 'POST',
         headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query})
    })
    const result = await anilistResponse.json()
    const bacthData = result.data;
    const animes = Object.keys(bacthData).map(key => {
    const anime = bacthData[key];
    // Devolvemos el objeto que Svelte necesita para pintar una Card
    return {
        id: anime.id,
        title: { romaji: anime.title.romaji, english: anime.title.english },
        coverImage: {extraLarge: anime.coverImage.extraLarge}
    };
});

// Devolver la respuesta final al front-end
return json(animes);
}