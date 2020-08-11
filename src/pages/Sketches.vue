<template>
  <Layout>
    <section>

      <h1 class="page-title">Sketches</h1>

        <div class="flex content-center flex-wrap" style="width:100%;">

          <div v-for="(image, index) in mediaSketches" :key="index" class="w-full md:w-1/3 mb-8 px-2">
            <img :src="image.thumb" style="max-width: 320px; cursor: pointer" class="w-full" @click="openGallery(index)">
          </div>

        </div>

      <component :is="lightBoxComp" :media="mediaSketches" ref="lightbox" :show-caption="true" :show-light-box="false"></component>
      
    </section>
  </Layout>
</template>

<script>
// import LightBox from 'vue-it-bigger'

export default {
  components: {
    LightBox: () => import('vue-it-bigger')
  },
  data () {
    return {
      checked: true,
      akaCheck: false,
      sketchCheck: false,
      test: 'ASC',
      mediaSketches: [],
      lightBoxComp: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.lightBoxComp = 'LightBox'
    })
    for (let i = 0; i < this.$page.concepts.edges.length; i++) {
      this.mediaSketches.push({
        thumb: this.$page.concepts.edges[i].node.sketch[0].url,
        src: this.$page.concepts.edges[i].node.sketch[0].url,
        caption: '<a href="' + this.$page.concepts.edges[i].node.simple + '">' + this.$page.concepts.edges[i].node.name + '</a>'
      })
    }
  },
  computed: {
    filteredData () {
      return this.$page.concepts.edges.filter(concept => {
        return concept.node.sketch.length > 0
        })
    }
  },
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index)
    }
  }
}
</script>

<style>
.vib-container .vib-thumbnail, .vib-container .vib-thumbnail-active {
  height: 75px !important;
  width: 100px;
  background-position: 0%;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0;
}

.vib-content img.vib-image {
    max-height: 70vh
}
</style>

<page-query>
query Concepts {
  concepts: allConcept {
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
