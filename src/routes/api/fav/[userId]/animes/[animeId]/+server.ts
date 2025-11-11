import { json } from "@sveltejs/kit";
import { getFavoritesCollection } from "$lib/server/mongo";

const collection = await getFavoritesCollection()
// api/fav/animes/[userId]
export async function PUT({params}): Promise<any> {
    const {userId, animeId} = params
    
    const documentToUpdate = await collection.updateOne({userId}, {
        // $addToSet: Añade un valor a un array solo si el valor no está ya presente.
    $addToSet: {animes: Number(animeId)}
    }, {upsert: true})
    return json({status: 200})
}
export async function DELETE({params, request}): Promise<any> {
    const {userId, animeId} = params
    console.log(userId, animeId);
    const result = await collection.updateOne({userId}, {$pull: {animes: parseInt(animeId)}});
    return json({status: 200})
}