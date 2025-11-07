<div class="main">
    <div class="container mx-auto max-w-4xl px-4 py-8 text-slate-300">
    <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-white oswald">Acerca de AnimeBeats</h1>
        <p class="text-lg mt-4">
            Tu lugar para explorar y escuchar los openings y endings de tus animes favoritos.
        </p>
    </header>

    <section id="author" class="mb-12 bg-slate-800/50 p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-4 text-center text-white">Sobre el Autor</h2>
        <div class="flex flex-col items-center text-center">
            <img src="https://avatars.githubusercontent.com/u/182448227?v=4" alt="Foto de Friedrich Ruiz" class="w-32 h-32 rounded-full mb-4 border-4 border-slate-600">
            <p class="text-xl font-semibold">Friedrich Ruiz (fiedri)</p>
            <p class="text-md text-slate-400">Estudiante de Informática</p>
            <blockquote class="mt-4 italic border-l-4 border-slate-600 pl-4 max-w-xl">
                "Tuve un sueño en el que cantaba o escuchaba el opening de Fullmetal Alchemist: Brotherhood y me decía: 'Coño, no me sé el nombre de esa canción'. Luego pensé... ¿y si hubiera una aplicación en la que pudiera encontrar los openings y los endings de cada anime y escucharlos en la misma aplicación para ver si me gustan o no?"
            </blockquote>
            <p class="mt-4">Esa idea fue la semilla para crear AnimeBeats.</p>
            <div class="mt-6">
                <p>Puedes encontrarme en:</p>
                <!-- Aquí puedes agregar tus enlaces a redes sociales -->
                <div class="flex justify-center space-x-4 mt-2">
                    <ul>
                        <li>
                            <a href="https://github.com/fiedri" target="_blank" class="text-blue-400 hover:text-blue-300">GitHub</a>

                        </li>
                        <li>
                        <a href="https://x.com/Friedrichruz" target="_blank" class="text-blue-400 hover:text-blue-300">x</a>

                    </li>
<li><a href="https://Friedrich Ruiz.netlify.com" target="_blank" class="text-blue-400 hover:text-blue-300" >Portafolio</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section id="features" class="mb-12">
        <h2 class="text-3xl font-bold mb-6 text-center text-white">Funcionalidades</h2>
        <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 p-6 rounded-lg features-container">
                <h3 class="text-xl font-bold mb-2 text-white">Explora y Busca</h3>
                <p>Descubre animes populares en la página de inicio o utiliza la barra de búsqueda para encontrar ese anime que tienes en mente.</p>
            </div>
            <div class="bg-slate-800/50 p-6 rounded-lg features-container">
                <h3 class="text-xl font-bold mb-2 text-white">Escucha al Instante</h3>
                <p>Accede a la lista completa de temas musicales de cada anime y reprodúcelos directamente en la página con el reproductor integrado.</p>
            </div>
        </div>
    </section>

    <section id="notes" class="mb-12 bg-slate-800/50 p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-4 text-center text-white">Notas Importantes</h2>
        <div class="space-y-4 max-w-3xl mx-auto">
            <div>
                <h3 class="text-xl font-semibold text-amber-400">Contenido en Crecimiento</h3>
                <p>La base de datos de temas se está curando manualmente para asegurar su calidad. Por ahora, la lista de animes es limitada, ¡pero seguirá creciendo!</p>
            </div>
            <div>
                <h3 class="text-xl font-semibold text-red-400">Reproducción de Vídeos</h3>
                <p>Debido a restricciones de YouTube, algunos vídeos podrían no funcionar en el reproductor integrado. Si eso pasa, puedes usar el enlace directo a YouTube que se proporciona.</p>
            </div>
        </div>
    </section>

    <section id="tech" class="text-center">
        <h2 class="text-3xl font-bold mb-6 text-white">Tecnologías Utilizadas</h2>
        <div class="tech-span-container">
            <span class="bg-gray-700 px-3 py-1 rounded-full">SvelteKit</span>
            <span class="bg-gray-700 px-3 py-1 rounded-full">Vite</span>
            <span class="bg-gray-700 px-3 py-1 rounded-full">Tailwind CSS</span>
            <span class="bg-gray-700 px-3 py-1 rounded-full">TypeScript</span>
            <span class="bg-gray-700 px-3 py-1 rounded-full">MongoDB</span>
            <span class="bg-gray-700 px-3 py-1 rounded-full">AniList API</span>
        </div>
    </section>
</div>
</div>
<style>
    .main{
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .features-container,
    #notes{
        padding: 20px;
        margin-bottom: 10px;
    }
@media(width <800px){
h1{
margin-top: 70px;
}
}
</style>