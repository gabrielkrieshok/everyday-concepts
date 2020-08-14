<template>
  <Layout>
      <div class="lg:mx-32 md:mx-16 sm:mx-8 mx-4 pt-8">
      <div class="flex flex-wrap -mx-8">
      <div class="my-8 px-8 w-full overflow-hidden xl:w-1/2">

  <section id="metadata" class="mx-auto">
    <h1 class="text-6xl font-medium leading-none">{{ $page.concept.name}}</h1>

    <div class="font-medium uppercase mb-4">
      <div class="text-gray-500 font-light text-sm">Category </div>
      <div class="text-blue-500 tracking-wide">{{ $page.concept.category }}</div>
    </div>

    <div v-if="$page.concept.aka.length>0" class="text-gray-500 font-light text-sm mt-4">
      <div class="uppercase">Also Known As...</div>
      <span
        v-for="item in $page.concept.aka"
        :key="item.id"
        :to="item.path"
        class="text-xs py-1 mt-1 px-2 mr-1 font-medium text-gray-700 rounded-full border border-gray-700 inline-block align-middle"
      >{{ item }}</span>
    </div>

    <div v-if="$page.concept.similar.length>0" class="text-gray-500 font-light text-sm mt-4">
      <div class="uppercase">Related</div>
      <span
        v-for="item in $page.concept.similar"
        :key="item.id"
        :to="item.path"
        class="text-xs py-1 mt-1 px-2 mr-1 font-medium text-gray-700 border border-gray-700 rounded-full inline-block align-middle"
      >{{ item }}</span>
    </div>
        </section>
</div>
<div class="my-8 px-8 w-full overflow-hidden xl:w-1/2">
      <section class="post-image mx-auto">
            <g-image :src="$page.concept.sketch[0].thumbnails.large.url" @click="openGallery(0)" :alt="$page.concept.name"></g-image>
      </section>
</div>
</div>

<section>
          <div class="mb-8">
            <h1 class="text-4xl font-medium leading-none">Definition</h1>
            <div class="text-xl text-gray-700 font-serif" v-html="$page.concept.definition"></div>
          </div>

          <div v-if="$page.concept.origin" class="mb-8">
            <h1 class="text-4xl font-medium leading-none">Origin</h1>
            <div class="text-xl text-gray-700 font-serif" v-html="$page.concept.origin"></div>
          </div>

          <div v-if="$page.concept.everydayUse" class="mb-8">
            <h1 class="text-4xl font-medium leading-none">Everyday Use</h1>
            <div class="text-xl text-gray-700 font-serif" v-html="markdownContent"></div>
          </div>
</section>
            <div class="text-right mx-auto mt-12 text-sm font-light text-gray-500 uppercase">
              <time>Updated <span class="ml-1 font-medium text-base">{{ $page.concept.date }}</span></time>
            </div>

      </div>

      <component :is="lightBoxComp"
      :media="sketchInfo"
      ref="lightbox"
      :show-caption="false"
      :show-light-box="false"
      :showThumbs="false"
      :disableScroll="true"
      :nThumbs=1
      >
      </component>

  </Layout>
</template>

<script>
import showdown from 'showdown';
const markdownConverter = new showdown.Converter();

export default {
  metaInfo() {
      return {
        title: this.$page.concept.name,
        meta: [
          {
            key: 'og:description',
            name: 'og:description',
            content: 'Everyday Concepts — Exploring the concepts, ideas, and mental models that construct our lives.\n\n' + this.$page.concept.name + ': ' + this.$page.concept.definition,
          },
          {
            key: 'twitter:description',
            name: 'twitter:description',
            content: 'Everyday Concepts — Exploring the concepts, ideas, and mental models that construct our lives.\n\n' + this.$page.concept.name + ': ' + this.$page.concept.definition,
          },
        ],
      }
    },
  components: {
    LightBox: () => import('vue-it-bigger')
  },
  data() {
    return {
      markdownContent: '',
      sketchInfo: [
        {
          thumb: '',
          src: '',
        }
      ],
      lightBoxComp: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.lightBoxComp = 'LightBox'
    })
  },
  methods: {
    openGallery() {
      this.$refs.lightbox.showImage(0)
      this.sketchInfo = [{
        thumb: this.$page.concept.sketch[0].thumbnails.large.url,
        src: this.$page.concept.sketch[0].url
      },
    ]}
  },
  created() {
      this.markdownContent = markdownConverter.makeHtml(this.$page.concept.everydayUse)
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
query($id: ID!) {
  concept(id: $id) {
    id
    name
    simple
    priority
    category
    aka
    origin
    similar
    definition
    everydayUse
    date (format: "MMMM D, YYYY")
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
</page-query>
