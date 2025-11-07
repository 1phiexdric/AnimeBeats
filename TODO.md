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


## notes
¡Genial! Ahora que los datos son válidos, el siguiente paso es enviarlos a un "endpoint" en tu backend para que puedan ser
  procesados y guardados.

  Dado que estás usando SvelteKit, puedes crear estos endpoints directamente en tu proyecto. El proceso general es:

   1. Crear un Endpoint de API: Crearemos un archivo en tu carpeta routes que se encargará de recibir los datos. Por
      ejemplo, src/routes/api/auth/register/+server.ts.
   2. Enviar los Datos (Frontend): Usaremos la función fetch en tu componente .svelte para enviar los datos validados por
      zod a este nuevo endpoint.
   3. Procesar los Datos (Backend): En el endpoint, leeremos los datos, los validaremos de nuevo (¡muy importante por
      seguridad!), hashearemos la contraseña y la guardaremos en la base de datos.

  Aquí te guío paso a paso:

  1. Crea el Endpoint de Registro en tu Backend

  Crea un nuevo archivo en la siguiente ruta: src/routes/api/auth/register/+server.ts.

  Dentro de este archivo, escribirás una función POST que SvelteKit ejecutará cada vez que reciba una petición a
  /api/auth/register.

    1 // src/routes/api/auth/register/+server.ts
    2 import { json } from '@sveltejs/kit';
    3 import type { RequestHandler } from './$types';
    4
    5 // Reutiliza o redefine el esquema de Zod aquí para validar en el servidor.
    6 // ¡Nunca confíes únicamente en la validación del cliente!
    7 const registerSchema = z.object({
    8   username: z.string().min(3),
    9   email: z.string().email(),
   10   password: z.string().min(6),
   11 });
   12
   13 export const POST: RequestHandler = async ({ request }) => {
   14   const body = await request.json();
   15
   16   // 1. Validar los datos que llegan al servidor
   17   const result = registerSchema.safeParse(body);
   18   if (!result.success) {
   19     return json({ error: 'Datos inválidos' }, { status: 400 });
   20   }
   21
   22   const { username, email, password } = result.data;
   23
   24   // 2. Hashear la contraseña (¡NUNCA la guardes en texto plano!)
   25   // Necesitarás una librería como bcryptjs. Instálala con: pnpm add bcryptjs @types/bcryptjs
   26   // const hashedPassword = await bcrypt.hash(password, 10);
   27
   28   // 3. Guardar en la base de datos
   29   // Aquí iría tu lógica para conectar con MongoDB y crear el nuevo usuario.
   30   // Ejemplo conceptual:
   31   // const db = await connectToDB();
   32   // await db.collection('users').insertOne({
   33   //   username,
   34   //   email,
   35   //   password: hashedPassword,
   36   // });
   37
   38   console.log(`Registrando usuario: ${username}, email: ${email}`);
   39   // Por ahora, simularemos que todo fue bien.
   40
   41   // 4. Devolver una respuesta de éxito
   42   return json({ message: '¡Registro exitoso!' }, { status: 201 });
   43 };
  Nota de seguridad: Antes de guardar la contraseña, debes "hashearla". Instala bcryptjs con pnpm add bcryptjs
  @types/bcryptjs y úsalo como en el ejemplo comentado.

  2. Envía los Datos desde tu Formulario

  Ahora, vuelve a tu componente formLoginSign.svelte. En la función validateForm, dentro del else donde la validación de zod
   es exitosa, añade una llamada fetch.

    1 <script lang="ts">
    2   // ...
    3   let apiError = ''; // Para mostrar errores del servidor
    4
    5   async function validateForm(event: SubmitEvent) {
    6     // ... (toda la lógica de validación de zod que ya tienes)
    7
    8     if (!result.success) {
    9       errors = result.error.flatten().fieldErrors;
   10       apiError = '';
   11     } else {
   12       errors = {};
   13       apiError = '';
   14
   15       // ¡Aquí está la nueva lógica!
   16       try {
   17         const response = await fetch('/api/auth/register', { // O '/api/auth/login'
   18           method: 'POST',
   19           headers: {
   20             'Content-Type': 'application/json',
   21           },
   22           body: JSON.stringify(result.data), // Enviamos los datos validados
   23         });
   24
   25         const responseData = await response.json();
   26
   27         if (!response.ok) {
   28           // El servidor devolvió un error (ej: email ya existe)
   29           apiError = responseData.error || 'Ocurrió un error en el servidor.';
   30         } else {
   31           // ¡Éxito!
   32           console.log(responseData.message);
   33           // Aquí podrías redirigir al usuario, por ejemplo:
   34           // window.location.href = '/dashboard';
   35         }
   36       } catch (err) {
   37         apiError = 'No se pudo conectar con el servidor.';
   38       }
   39     }
   40   }
   41 </script>
   42
   43 <!-- En tu HTML, donde quieras mostrar el error del servidor -->
   44 {#if apiError}
   45   <p class="server-error">{apiError}</p>
   46 {/if}

  Con esto, tu formulario ya puede comunicarse con tu backend. Deberías crear un endpoint similar para el login, pero en
  lugar de crear un usuario, buscarías uno en la base de datos y compararías la contraseña hasheada.