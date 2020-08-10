module.exports = {
  siteName: 'Everyday Concepts',
  icon: {
    favicon: './static/icons/favicon.png',
    touchicon: './static/icons/apple-touch-icon.png'
  },
  plugins: [
    {
      use: "@gridsome/source-airtable",
      options: {
        // Add these to a .env file
        // Details on finding these values can be found at:
        // https://gridsome.org/plugins/@gridsome/source-airtable
        apiKey: process.env.AIRTABLE_KEY, //required
        baseId: process.env.AIRTABLE_BASE, //required
        tables: [
          {
            name: "Concepts",
            typeName: "Concept", //required - needs to match template name
            sort: { by: "date", order: "ASC" },
            select: { //optional
              view: "Public"
            },
            links: [], //optional
          },
        ],
        tableName: "Concepts", //required
      }
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {},
        presetEnvConfig: {},
        shouldPurge: true,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    },
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'settings/*.json'
      }
    }
  ],
  templates: {
    Concept: [{
      path: '/:Simple',
      component: './src/templates/ConceptPost.vue'
    }]
  },
  chainWebpack: config => {
    config.resolve.alias.set('@modules', '@/resources/js/modules');
    config.resolve.alias.set('@utilities', '@/resources/js/utilities');
    
  }
}
