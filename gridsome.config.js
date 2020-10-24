module.exports = {
  siteName: 'Everyday Concepts',
  siteUrl: "https://everydayconcepts.io",
  icon: {
    favicon: './static/icons/favicon.png',
    touchicon: './static/icons/apple-touch-icon.png'
  },
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-140956931-1'
      }
    },
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
    },
    // {
    //   use: 'gridsome-plugin-rss',
    //   options: {
    //     contentTypeName: 'Concept',
    //     feedOptions: {
    //       title: 'Everyday Concepts',
    //       feed_url: 'https://everydayconcepts.io/rss.xml',
    //       site_url: 'https://everydayconcepts.io'
    //     },
    //     feedItemOptions: node => ({
    //       title: node.name,
    //       description: node.definition,
    //       url: 'https://everydayconcepts.io/' + node.path,
    //       author: 'Gabriel Krieshok'
    //     }),
    //     output: {
    //       dir: './static',
    //       name: 'rss.xml'
    //     }
    //   }
    // }
    {
      use: 'gridsome-plugin-feed',
      options: {
        // Required: array of `GraphQL` type names you wish to include
        contentTypes: ['Concept'],
        
        // Optional: any properties you wish to set for `Feed()` constructor
        // See https://www.npmjs.com/package/feed#example for available properties
        feedOptions: {
          title: 'Everyday Concepts',
          description: 'Exploring the concepts, ideas, and mental models that construct our lives.'
        },
        // === All options after this point show their default values ===
        // Optional; opt into which feeds you wish to generate, and set their output path
        rss: {
          enabled: true,
          output: '/feed.xml'
        },
        atom: {
          enabled: false,
          output: '/feed.atom'
        },
        json: {
          enabled: false,
          output: '/feed.json'
        },
        // Optional: the maximum number of items to include in your feed
        // maxItems: 25,
        // Optional: an array of properties passed to `Feed.addItem()` that will be parsed for
        // URLs in HTML (ensures that URLs are full `http` URLs rather than site-relative).
        // To disable this functionality, set to `null`.
        htmlFields: ['title', 'description', 'content'],
        // Optional: if you wish to enforce trailing slashes for site URLs
        enforceTrailingSlashes: false,
        // Optional: a method that accepts a node and returns true (include) or false (exclude)
        // Example: only past-dated nodes: `filterNodes: (node) => node.date <= new Date()`
        filterNodes: (node) => true,
        // Optional: a method that accepts a node and returns an object for `Feed.addItem()`
        // See https://www.npmjs.com/package/feed#example for available properties
        // NOTE: `date` field MUST be a Javascript `Date` object
        nodeToFeedItem: (node) => ({
          title: node.name,
          // date: node.date || node.date,
          content: node.sketch
        })
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
