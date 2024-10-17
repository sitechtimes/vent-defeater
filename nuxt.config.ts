// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["assets/main.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    }
  },
  modules: ["@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      backend: process.env.NUXT_PUBLIC_BACKEND
    }
  },
  app: {
    head: {
      title: "Vent Defeater",
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          hid: "description",
          name: "description",
          content:
            "Featuring features fraught with a few fixes featured in many of your favorite apps and websites, Vent Defeater enables the imagination of anyone looking to build modern, sleek, and top-quality presentations."
        }
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo/logo.svg" }]
    }
  }
});
