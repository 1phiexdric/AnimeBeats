// --- TIPOS DE DATOS ---

// 1. Tipado del Payload del JWT que verificas
interface JwtPayload {
    email: string;
    
}


type MongoUser = {
    _id: import('mongodb').ObjectId; 
    email: string;
    username: string;
    password?: string; 
}

declare global {
    namespace App {
        interface Locals {
            user?: {
                _id: string;
                email: string;
                username: string;
            };
        }
    }
}

// --- IMPORTACIONES ---
import { type Handle } from "@sveltejs/kit";
// Asegúrate de que verificarToken tenga una firma que devuelva Promise<JwtPayload | string | null> o similar
import { verificarToken } from "$lib/server/auth_utils"; 
import { getUserCollection } from "$lib/server/mongo";


// Inicializa la colección de MongoDB
const collectionPromise = getUserCollection();

export const handle: Handle = async ({ event, resolve }) => {
    // ⚠️ Importante: Esperamos la conexión de la colección fuera del bloque handle
    const collection = await collectionPromise;
    const token = event.cookies.get("sessionid");
console.log('HOOK: Token encontrado:', token)
    if (token) {
        try {
            // verficadorToken debe devolver el tipo JwtPayload
            const payload = verificarToken(token) as JwtPayload; 
            
            if (payload && typeof payload === "object") {
                
                const user: MongoUser = await collection.findOne(
                    { email: payload.email },
                    { projection: { password: 0 } }
                );
console.log('HOOK: Usuario de BD:', user)
                if (user) {
                    event.locals.user = {
                        _id: user._id.toString(), 
                        email: user.email,
                        username: user.username,
                    };
                    console.log('HOOK: ¡locals.user asignado!', event.locals.user); // <-- AÑADE ESTO
                }
            }
        } catch (err) {
            console.error('HOOK: Error en try/catch:', (err as Error).message); // <-- AÑADE ESTO
            console.log('Token inválido:', (err as Error).message);
            // 3. Limpiar el token inválido
            event.cookies.delete('sessionid', { path: '/' }); 
        }
    }
    
    
    return await resolve(event);
};