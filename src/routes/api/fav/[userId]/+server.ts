import { json } from "@sveltejs/kit";
import { getFavoritesCollection } from "$lib/server/mongo";

const collection = await getFavoritesCollection()
// api/fav/[userId]
export async function GET({url, setHeaders, params}): Promise<any> {
   
    const { userId }= params
    const favorites = await collection.findOne({userId})
    if(!favorites) return new Response("No hay datos para este usuario", {status: 404})
    
    return json(favorites)
}
