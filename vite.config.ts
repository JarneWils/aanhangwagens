import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	// base: "/wp-content/themes/flux-child/build",
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/entry.js`,
				chunkFileNames: `assets/script.js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
		outDir: "../flux-child/build",
	},
	server: {
		port: 5173,
		// host: true,
		origin: "http://localhost:5173",
	},
});
