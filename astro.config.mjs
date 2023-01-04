import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }
            }
        }
    }
});
