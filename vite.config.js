import { defineConfig } from "vite"; import react from "@vitejs/plugin-react"; import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({ plugins: [ react(), VitePWA({ registerType: "autoUpdate", includeAssets: ["pantrypilot.svg"], manifest: { name: "PantryPilot", short_name: "PantryPilot", description: "Discover recipes using ingredients you already have.", theme_color: "#2e7d32", background_color: "#ffffff", display: "standalone", orientation: "portrait", icons: [ { src: "/pantrypilot.svg", sizes: "any", type: "image/svg+xml", purpose: "any" } ] } }) ] });

