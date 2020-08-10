<template>
  <Layout>
    <section id="container-centre" class="column centre flex-1">
      <h1 class="page-title text-3xl md:text-center md:text-5xl mb-16 lg:mb-24 lg:text-6xl">Concepts</h1>

                  <!-- <label class="inline-flex items-center mt-3">
                <input type="checkbox" v-model="checked" class="form-checkbox h-5 w-5 text-gray-600"><span class="ml-2 text-gray-700">Order</span>
            </label>

                              <label class="inline-flex items-center mt-3">
                <input type="checkbox" v-model="akaCheck" class="form-checkbox h-5 w-5 text-gray-600"><span class="ml-2 text-gray-700">AKA</span>
            </label>

                              <label class="inline-flex items-center mt-3">
                <input type="checkbox" v-model="sketchCheck" class="form-checkbox h-5 w-5 text-gray-600"><span class="ml-2 text-gray-700">Sketch</span>
            </label> -->
      <div class="px-2">
        <div class="posts flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 mb-8 px-2" v-for="concept in filteredData" :key="concept.node.id">
            <article class="article-card bg-white overflow-hidden rounded-lg shadow-lg flex-1">
              <!-- <g-link class="featured-image-link block relative overflow-hidden" :to="concept.node.simple">
                <figure>
                  <div v-for="(file) in concept.node.sketch" :key="file.id">
                    <g-image :src="file.url" :alt="file.alt" class="block loaded" />
                </div>
                </figure>
              </g-link> -->
              <div class="p-8">
                <span class="text-blue-500 font-medium uppercase tracking-wide text-xs">
                  {{ concept.node.category }}
                </span>
                <g-link :to="concept.node.simple">
                  <h2 class="text-2xl block text-purple-900 hover:text-blue-500 mb-0">{{ concept.node.name }}</h2>
                  <p class="block font-medium text-sm py-4 text-gray-700" v-html="concept.node.definition"></p>
                  <div class="text-right font-light text-sm text-gray-600">
                    <time :datetime="concept.node.date">{{ concept.node.date }}</time>
                  </div>
                </g-link>

                </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      akaCheck: false,
      sketchCheck: false,
      test: 'ASC'
    }
  },
  computed: {
    filteredData () {
      return this.$page.concepts.edges.filter(concept => {
        return concept.node.sketch.length > 0
        })
    }
      // if(this.akaCheck) {
      //   return this.$page.concepts.edges.filter(concept => {
      //       return concept.node.aka.length > 0
      //   })
      // } else {
      //   return this.$page.concepts.edges
      // }

      // if(this.checked) {
      //   console.log('checked')
      //   return this.$page.concepts.edges
      // } else {
      //   console.log('unchecked')
      //   return this.$page.conceptsASC.edges
      // }
  }
};

//  (format: "DD MMMM YYYY")
// datePublic(format:"ddd MMM DD YYYY hh:mm:ss zZ")
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
