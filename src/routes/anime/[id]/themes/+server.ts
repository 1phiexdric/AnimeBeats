// src/routes/anime/[anilist_id]/temas/+server.js

import { json } from '@sveltejs/kit';
import { getTemasCollection } from '$lib/server/mongo';

/**
 * Maneja las peticiones GET a /api/anime/[anilist_id]/temas
 * @param {Object} params - Parámetros de la ruta, incluyendo anilist_id
 * @returns {Promise<Response>}
 */
export async function GET({ params }) {
    const { id } = params;
    
    // Aseguramos que la ID sea un número para la consulta
    const identifier = parseInt(id);
    
    if (isNaN(identifier)) {
        return json({ error: 'ID de AniList inválida' }, { status: 400 });
    }
    
    try {
        const temasCollection = await getTemasCollection();

        // 1. Consulta RÁPIDA a MongoDB:
        const animeTemas = await temasCollection.findOne({ 
            anilist_id: identifier
        });

        if (!animeTemas) {
            return json({ error: 'No se encontraron temas curados para este anime.' }, { status: 404 });
        }

        // 3. Devolvemos la respuesta JSON limpia
        return json(animeTemas);
        
    } catch (error) {
        console.error('Error al consultar MongoDB:', error);
        return json({ error: 'Error interno del servidor al obtener datos.' }, { status: 500 });
    }
}