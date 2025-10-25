import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consulta https://svelte.dev/docs/kit/integrations
	// para más información sobre los preprocesadores
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto solo admite algunos entornos, consulta https://svelte.dev/docs/kit/adapter-auto para obtener una lista.
		// Si tu entorno no es compatible o si te has decidido por un entorno específico, cambia el adaptador.
		// Consulta https://svelte.dev/docs/kit/adapters para obtener más información sobre los adaptadores.
		adapter: adapter()
	}
};

export default config;
