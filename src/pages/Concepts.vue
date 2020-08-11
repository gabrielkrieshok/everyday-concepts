<template>
  <Layout>
    <section id="container-centre" class="column centre flex-1">
      <h1 class="page-title">Concepts</h1>

      <div id="options" class="flex justify-center center-items border-b border-gray-200 pb-6 mb-6">
          <span class="mr-6">Arrange by...</span>
        <label class="flex text-gray-700 px-6">
          <input type="radio" value="name" v-model="options" class="form-checkbox h-5 w-5 mt-1 text-gray-600">
          <span class="mx-2">Name</span>
        </label>
        <label class="flex text-gray-700 px-6">
          <input type="radio" value="category" v-model="options" class="form-checkbox h-5 w-5 mt-1 text-gray-600">
          <span class="mx-2">Category</span>
        </label>
        <label class="flex text-gray-700 px-6">
          <input type="radio" value="date" v-model="options" class="form-checkbox h-5 w-5 mt-1 text-gray-600">
          <span class="mx-2">Date Added</span>
        </label>

      </div>

      <div class="px-2">
            <transition-group class="posts flex flex-wrap -mx-2" name="flip-list" tag="div">

          <div class="w-full md:w-1/3 mb-8 px-2" v-for="concept in filteredData" :key="concept.node.id">
            <div class="article-card bg-white overflow-hidden rounded-lg shadow-lg flex-1">
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
                  </div>
                </g-link>

                </div>
            </div>
          </div>
            </transition-group>

        </div>
    </section>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      options: 'date'
    }
  },
  computed: {
    filteredData () {
      if (this.options == 'name') {
        return this.$page.concepts.edges.sort((a, b) => {
          let fa = a.node.simple, fb = b.node.simple
          if (fa < fb) { return -1 }
          if (fa > fb) { return 1 }
          return 0
        })
      } else if (this.options == 'category') {
        return this.$page.concepts.edges.sort((a, b) => {
          let fa = a.node.category, fb = b.node.category
          if (fa < fb) { return -1 }
          if (fa > fb) { return 1 }
          return 0
        })
      } else {
          return this.$page.concepts.edges.sort((a, b) => {
            let fa = a.node.date, fb = b.node.date
            if (fa < fb) { return 1 }
            if (fa > fb) { return -1 }
            return 0
          })
      }
    }
  }
}
</script>

<page-query>
query Concepts {
  concepts: allConcept(sortBy: "name", order: DESC) {
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
