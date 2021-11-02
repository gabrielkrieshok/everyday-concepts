<template>
  <Layout>
    <section id="container-centre" class="column centre flex-1">
      <h1 class="page-title">About</h1>
      <div class="content">
        <p>Everyday Concepts are an ongoing effort to unpack and explore useful concepts, ideas, and mental models that crop up (or ought to) in our lives.</p>
        <p>I am currently developing a book projects of these concepts that further explore how to visualize them and their relevance to everyday life.</p>
        <p>Defined, sketched, and produced by <a href="https://gabrielkrieshok.com/">Gabriel Krieshok</a>.</p>
        <p><a href="https://www.buymeacoffee.com/gabrielkrieshok" target="_blank">Buy me a coffee ☕️</a> to help support this project.</p>
      </div>
    </section>

  </Layout>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      submitText: false
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    },
    handleSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
      .then(() => this.submitText = true)
      .catch(error => alert(error))
    }
  }
}
</script>