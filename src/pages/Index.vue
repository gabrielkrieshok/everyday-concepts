<template>
  <Layout>
    <section id="container-centre" class="column centre flex-1">
      <h1 class="page-title">Everyday Concepts</h1>
      <h3 class="text-lg text-center md:text-3xl mb-16 lg:mb-12 lg:text-3xl">Exploring the concepts, ideas, and mental models that construct our lives.</h3>

      <div class="content">        
        <h2 class="text-center text-gray-600">Latest Concepts</h2>

        <div class="flex flex-wrap">
          <div class="flex w-full md:w-1/3 mb-8 px-2" v-for="concept in filteredData" :key="concept.node.id">
            <article class="article-card bg-white overflow-hidden rounded-lg shadow-lg flex-1">
              <g-link class="featured-image-link block relative overflow-hidden" :to="concept.node.simple">
                <figure>
                    <g-image :src="concept.node.sketch[0].thumbnails.large.url" :alt="concept.node.name" class="block loaded" />
                </figure>
              </g-link>
                
            </article>
            
          </div>
        </div>
        
        <p class="text-center text-xl">Explore all of the <a href="/concepts">concepts</a> or just the <a href="/gallery">gallery of sketches</a>.</p>

      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  computed: {
    filteredData () {
      return this.$page.concepts.edges.slice(0, 3).map(concept => {
        return concept
        })
    }
  }
}
</script>

<page-query>
query Concepts {
  concepts: allConcept(sortBy: "date", order: DESC) {
    edges {
      node {
        id
        name
        simple
        priority
        category
        aka
        similar
        definition
        everydayUse
        datePublished
        sketch {
          id
          url
          filename
          thumbnails {
            large {
              url
            }
          }
        }
      }
    }
  }
}
</page-query>