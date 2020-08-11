<template>
  <Layout :hideHeader="true" :disableScroll="true">
    <div class="container sm:pxi-0 mx-auto overflow-x-hidden">
      <div class="lg:mx-32 md:mx-16 sm:mx-8 mx-4 pt-8">

<div class="flex flex-wrap -mx-8">
<div class="my-8 px-8 w-full overflow-hidden xl:w-1/2">

  <section id="metadata" class="mx-auto">
    <h1 class="text-6xl font-medium leading-none">{{ $page.concept.name}}</h1>

    <div class="font-medium uppercase mb-4">
      <div class="text-gray-500 font-light text-sm">Category </div>
      <div class="text-blue-700 tracking-wide">{{ $page.concept.category }}</div>
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
        <div class="attachments">
          <div v-for="(file) in $page.concept.sketch" :key="file.id" class="attachment--item">
            <g-image :src="file.url"></g-image>
          </div>
        </div>
      </section>
</div>
</div>

<section>
          <div class="mb-8">
            <h1 class="text-4xl font-medium leading-none">Definition</h1>
            <div class="text-xl text-gray-700 font-serif" v-html="$page.concept.definition"></div>
          </div>

          <div v-if="$page.concept.everydayUse">
            <h1 class="text-4xl font-medium leading-none">Everyday Use</h1>
            <div class="text-xl text-gray-700 font-serif" v-html="markdownContent"></div>
          </div>
</section>
            <div class="text-right mx-auto mt-12 relative font-light text-gray-700 uppercase">
              <time>Updated <span class="ml-1 font-medium">{{ $page.concept.date }}</span></time>
            </div>

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
    date (format: "MMMM DD, YYYY")
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