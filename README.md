# AnimeBeats

AnimeBeats es una aplicación web creada con SvelteKit que te permite explorar y escuchar los temas musicales (openings y endings) de tus animes favoritos.

## Funcionalidades Principales

- **Explora Animes Populares:** Descubre una lista de animes populares desde la página de inicio.
- **Busca tu Anime:** Utiliza la función de búsqueda para encontrar un anime específico por su nombre.
- **Escucha Temas Musicales:** Accede a la página de detalles de un anime para ver y escuchar todos sus temas musicales.
- **Reproductor Integrado:** Reproduce los temas musicales directamente en la página gracias a un reproductor de YouTube integrado.
- **Diseño Responsivo:** Disfruta de una experiencia de usuario fluida tanto en dispositivos de escritorio como en móviles.

## Cómo Funciona

AnimeBeats utiliza las siguientes APIs para obtener la información:

- **[AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/):** Para obtener la información de los animes, como el título, la portada, etc.
- **[AnimeThemes.moe API](https://animethemes.moe/):** Para obtener los temas musicales de cada anime.

## Tecnologías Utilizadas

- **[SvelteKit](https://kit.svelte.dev/):** Un framework de desarrollo web para construir aplicaciones rápidas y robustas.
- **[Vite](https://vitejs.dev/):** Una herramienta de construcción de frontend moderna y rápida.
- **[Tailwind CSS](https://tailwindcss.com/):** Un framework de CSS para un diseño rápido y personalizado.
- **[TypeScript](https://www.typescriptlang.org/):** Un superconjunto de JavaScript que añade tipado estático.

## Instalación y Uso

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/anime-beats.git
    ```
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    pnpm dev
    ```
4.  Abre tu navegador y visita `http://localhost:5173`.
