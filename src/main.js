// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import('vue-it-bigger/dist/vue-it-bigger.min.css') // when using webpack

import '~/resources/scss/main.scss'
require('typeface-open-sans')
require('typeface-patrick-hand')

export default function (Vue, { router, head, isClient }) {

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Add attributes to HTML tag
  head.htmlAttrs = { lang: 'en', class: 'min-h-full antialiased' }

  // Add attributes to BODY tag
  head.bodyAttrs = { class: 'text-blue-900 leading-normal text-lg' }

  // Import Google Fonts
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Open+Sans|Patrick+Hand&display=swap'
  })

  head.meta.push({
    key: 'og:title',
    name: 'og:title',
    content: `Everyday Concepts`,
  })

  head.meta.push({
    key: 'og:type',
    name: 'og:type',
    content: `website`,
  })

  head.meta.push({
    key: 'og:description',
    name: 'og:description',
    content: `Exploring the concepts, ideas, and mental models that construct our lives.`,
  })

  head.meta.push({
    key: 'twitter:description',
    name: 'twitter:description',
    content: `Exploring the concepts, ideas, and mental models that construct our lives.`,
  })

  head.meta.push({
    key: 'twitter:card',
    name: 'twitter:card',
    content: 'summary',
  })

  head.meta.push({
    key: 'twitter:creator',
    name: 'twitter:creator',
    content: '@gabrielkrieshok',
  })

  head.meta.push({
    key: 'twitter:card',
    name: 'twitter:card',
    content: 'summary',
  })

  head.meta.push({
    key: 'og:image',
    name: 'og:image',
    content: 'https://everydayconcepts.io/icons/feature.png',
  })

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: 'https://everydayconcepts.io' + to.path,
    })
    next()
  })
}
