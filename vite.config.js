import { defineConfig } from "vite";

const base = process.env.NODE_ENV === "production" ? "/claudia-mosquera/" : "/"

export default defineConfig({
    base,
    server: {
        port: 3001,
        open: true
    },
    optimizeDeps: {
        exclude: ['gsap']
    }
})