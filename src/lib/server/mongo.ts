import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const client = new MongoClient(env.MONGO_URL);

let dbPromise: any;

export async function connectToDateBase(){
    if(!dbPromise){
        dbPromise = client.connect().then(()=>{
            console.log("Conectado a la base de datos MongoDB");
            return client.db(env.MONGO_DB);
        })
    }
    return dbPromise
}

export async function getTemasCollection() {
    const db = await connectToDateBase();
    return db.collection('temas_anime');
}
export async function getUserCollection(){
    const db = await connectToDateBase();
    return db.collection('users')
}