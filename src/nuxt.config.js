import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s",
    title: "Wumpi",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      { property: "og:title", content: "Wumpi" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "http://locahost:3000/" },
      { property: "og:url", content: "https://d3203a0d.ngrok.io" },
      {
        property: "og:image",
        content:
          "https://cdn.discordapp.com/avatars/592568340485111827/33e085785f711d89ea67a37cc93fdeaf.png"
      },
      {
        property: "og:description",
        content:
          "Full suite of moderation. Easing the life of moderators everywhere."
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons"
      },
      {
        href:
          "https://fonts.googleapis.com/css?family=Montserrat+Alternates:100,300,400,500,700,900&display=swap",
        rel: "stylesheet"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    icons: {
      iconfont: "md"
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken4,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
