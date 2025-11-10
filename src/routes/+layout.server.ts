import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async({locals})=>{
    console.log('LAYOUT.SERVER: locals.user recibido:', locals.user); // <-- AÑADE ESTO
    return{
        user: locals.user
    }
}