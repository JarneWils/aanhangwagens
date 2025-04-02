import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/entry.js`,
				chunkFileNames: `assets/script.js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
		outDir: "dist",
	},
	server: {
		port: 5173,
		// host: true,
		origin: "http://localhost:5173",
	},
});
