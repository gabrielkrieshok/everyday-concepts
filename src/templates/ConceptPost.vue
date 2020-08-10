<template>
  <Layout :hideHeader="true" :disableScroll="true">
    <div class="container sm:pxi-0 mx-auto overflow-x-hidden">
      
      <div class="lg:mx-48 md:mx-16 sm:mx-8 mx-4">
      <section class="post-image mx-auto w-full">
        <div class="attachments">
          <div v-for="(file) in $page.concept.sketch" :key="file.id" class="attachment--item">
            <g-image :src="file.url"></g-image>
          </div>
        </div>
      </section>
      </div>

      <div class="lg:mx-32 md:mx-16 sm:mx-8 mx-4 pt-8">

        <section class="post-header container mx-auto px-0 mb-4">
          <span class="text-blue-500 font-medium uppercase tracking-wide text-sm">
            {{ $page.concept.category }}
          </span>
          <h1 class="text-5xl font-medium leading-none mt-0">{{ $page.concept.name}}</h1>
        </section>

        <section class="post-author-list mb-4 mx-0">
          <div class="flex items-center">
            <div class="pl-0 flex flex-col text-xs leading-none uppercase">
              <p class="text-gray-700">
                <time>{{ $page.concept.date }}</time>
              </p>
            </div>
          </div>
        </section>

        <section v-if="$page.concept.aka.length>0">
          <span class="text-gray-700 font-medium leading-none inline-block uppercase align-middle mr-2">AKA </span>
          <span
            v-for="item in $page.concept.aka"
            :key="item.id"
            :to="item.path"
            class="text-xs bg-blue-100 py-1 px-4 mr-2 text-gray-700 rounded-full inline-block align-middle"
          >{{ item }}</span>
        </section>

          <div class="text-xl py-4 text-gray-700 font-serif" v-html="$page.concept.definition"></div>

        <section v-if="$page.concept.similar.length>0" class="text-right post-tags container mx-auto relative pb-6 border-b">
          <span class="text-gray-700 font-medium leading-none inline-block uppercase align-middle mr-2">Similar to</span>
          <span
            v-for="item in $page.concept.similar"
            :key="item.id"
            :to="item.path"
            class="text-xs bg-transparent py-2 px-4 mr-2 border border-gray-600 text-gray-700 rounded-full"
          >{{ item }}</span>
        </section>

      </div>

      <div class="lg:mx-32 md:mx-16 px-4 sm:px-0 pb-10">

        <section v-if="$page.concept.everydayUse" class="post-content container mx-auto relative font-serif">
          <h2 class="text-4xl text-gray-700 font-medium leading-none mt-0">Everyday Use</h2>
          <div class="post-content-text text-xl" v-html="markdownContent"></div>
        </section>

      </div>
    </div>

  </Layout>
</template>

<page-query>
query($id: ID!) {
  concept(id: $id) {
    id
    name
    simple
    priority
    category
    aka
    similar
    definition
    everydayUse
    date (format: "DD MMMM YYYY")
    sketch {
      id
      url
      filename
    }
  }
}
</page-query>

<script>
import showdown from 'showdown';
const markdownConverter = new showdown.Converter();

export default {
  data() {
    return {
      markdownContent: ''
    }
  },
  created() {
      this.markdownContent = markdownConverter.makeHtml(this.$page.concept.everydayUse)
  },
  metaInfo() {
    return {
      title: this.$page.concept.name
    };
  }
  
};
</script>