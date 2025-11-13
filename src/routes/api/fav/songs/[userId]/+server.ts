import type { Song } from "$lib/types";
import { json } from "@sveltejs/kit";
import { getFavoritesCollection } from "$lib/server/mongo";

const collection = await getFavoritesCollection()

// api/fav/songs/[userId]
export async function PUT({params, request})  {
    const {userId} = params
    try{
        const body: Song = await request.json()
    const documentToUpdate = await collection.updateOne({userId},{
$addToSet: {canciones: body}
    }, { upsert: true })
    return json({status: 200})
    }catch(e){
        return json({status: 500, error: e})
    }
}

export async function DELETE({params, request}):Promise<any>  {
    const {userId} = params;
    const {enlace_youtube} = await request.json();
    // pull con condicion de filtro
    await collection.updateOne({userId}, {
        $pull: {canciones: {enlace_youtube}}
    })
    return json({ message: "Canción eliminada" }, { status: 200 });
}