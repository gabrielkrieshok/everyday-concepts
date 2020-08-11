<template>
  <Layout>
    <section id="container-centre" class="column centre flex-1">
      <h1 class="page-title">About</h1>
      <div class="content">
        <h3>Everyday Concepts are an ongoing effort to unpack and explore useful concepts, ideas, and mental models that crop up (or ought to) in our lives.</h3>
        <p>I am working on a book of these concepts that further explore how to visualize them and their relevance to everyday life.</p>
        <p>I am developing a podcast that explore these concepts in more depth.</p>
        <p>Follow me at on <a target="_blank" href="https://twitter.com/gabrielkrieshok">twitter</a> to stay tuned.</p>
        <p>Defined, sketched, and produced by me, Gabriel Krieshok.</p>
      </div>
    </section>
<section id="container-centre" class="column centre flex-1 mt-8">
      <h2>Contact Me</h2>
      <div class="content">
        <h3>Get in touch or let me know about new concepts I should sketch!</h3>

<!-- <form
  name="contact"
  method="post"
  v-on:submit.prevent="handleSubmit"
  action="/success/"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>
      Don’t fill this out: <input name="bot-field" />
    </label>
  </p>
  <div class="sender-info">
    <div>
      <label for="name" class="label" >Your name</label>
      <input type="text" name="name" v-model="formData.name" />
    </div>
    <div>
      <label for="email">Your email</label>
      <input type="email" name="email" v-model="formData.email" />
    </div>
  </div>

  <div class="message-wrapper">
    <label for="message">Message</label>
    <textarea name="message" v-model="formData.message"></textarea>
  </div>

  <button type="submit">Submit form</button>
</form> -->



        <form
          class="form"
          name="everyday-concepts-form"
          method="post"
          v-on:submit.prevent="handleSubmit"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>
      Don’t fill this out: <input name="bot-field" />
    </label>
  </p>
          <div class="row required">
            <label for="name">Name</label>
            <input
              class="input"
              id="name"
              type="text"
              name="name"
              autocomplete="name"
              required
              aria-required="true"
              v-model="formData.name"
            />
          </div>
          <div class="row required">
            <label for="email">Email</label>
            <input
              class="input"
              id="email"
              type="text"
              name="email"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="email"
              required
              aria-required="true"
              v-model="formData.email"
            />
          </div>
          <div class="row">
            <label for="message">Message</label>
            <textarea class="textarea" id="message" name="message" v-model="formData.message"></textarea>
          </div>
          <div class="row">
            <button class="inline-block rounded py-4 px-6 text-white font-bold bg-blue-500 hover:bg-blue-600" type="submit">Send</button>
            <p v-show="submitText" class="text-3xl py-2 text-blue-500 font-bold">Thanks!</p>
          </div>
        </form>
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