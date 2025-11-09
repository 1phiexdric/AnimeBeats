# MVP 2

## Fase 1: sistema de usuario

**Objetivo:**
que un usuario pueda registrarse, iniciar sesion y guardar sus favoritos (animes y canciones)

1. Crear un routing de sveltekit (/user/[id]) y todo el frontend
2. Usa Auth.js, para aprovechar el soporte nativo con sveltekit
3. Guardar los usuario en la base de datos con Mongo db
4. Crea una coleccion user con campos como:

```json
{
    username: string,
    email: string,
    password: string,
    favorites: {
        animes: [animeID],
        sons: [songID]
    }
}
```

4. Al iniciar sesion, guardar el token o sesion en localStorage
   Crea una Pestaña "MIs favoritos" donde aparezcan sus animes y canciones guardadas

## Fase 2: Experiencia y estilo

1. Agrega un tema claro

## Comunidad

Añadir un boton "sugerir un anime", para mandar los datos a un enpoint