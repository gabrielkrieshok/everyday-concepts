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
                  <div v-for="(file) in concept.node.sketch" :key="file.id">
                    <g-image :src="file.url" :alt="file.alt" class="block loaded" />
                  </div>
                </figure>
              </g-link>
              
              <div class="p-4">

                <span class="text-blue-500 font-medium uppercase tracking-wide text-xs">
                  {{ concept.node.category }}
                </span>
              
              <g-link :to="concept.node.simple">
                <h2 class="text-2xl block text-purple-900 hover:text-blue-500 mb-0">{{ concept.node.name }}</h2>

                <section v-if="concept.node.aka.length>0" class="mt-2">
                  <span class="text-sm text-gray-700 font-light leading-none inline-block uppercase align-middle mr-2">AKA </span>
                  <span
                    v-for="item in concept.node.aka"
                    :key="item.id"
                    :to="item.path"
                    class="text-xs bg-blue-100 py-1 px-4 mr-2 text-gray-700 rounded-full inline-block align-middle"
                  >
                    {{ item }}
                  </span>
                </section>
              </g-link>

              </div>
                
            </article>
            
          </div>
        </div>
        
        <p class="text-center text-xl">Explore all of the <a href="/concepts/">concepts</a> and <a href="/sketches/">sketches</a>.</p>

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
        date
        sketch {
          id
          url
          filename
        }
      }
    }
  }
}
</page-query>