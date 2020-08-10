<template>
  <Layout>
    <section id="container-centre" class="column centre flex-1">
      <h1 class="page-title">About</h1>
      <div class="content">
        <p>Everyday Concepts are an ongoing effort to unpack and explore useful concepts, ideas, and mental models that crop up (or ought to) in our lives.</p>
        <p>I am working on a book of these concepts that further explore how to visualize them and their relevance to everyday life.</p>
        <p>I am developing a podcast that explore these concepts in more depth.</p>
        <p>Follow me at on <a target="_blank" href="https://twitter.com/gabrielkrieshok">twitter</a> to stay tuned.</p>
        <p>Defined, sketched, and produced by me, Gabriel Krieshok.</p>
      </div>
    </section>
<section id="container-centre" class="column centre flex-1">
      <h1 class="page-title">Contact Me</h1>
      <div class="content">
        <p>Get in touch or let me know about new concepts I should sketch!</p>
        <form class="form" netlify name="everyday-concepts-form" method="POST" >
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
            />
          </div>
          <div class="row">
            <label for="message">Message</label>
            <textarea class="textarea" id="message" name="message"></textarea>
          </div>&nbsp;
          <div class="row">
            <button class="inline-block rounded py-4 px-6 text-white font-bold bg-blue-500 hover:bg-blue-600" type="submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  </Layout>
</template>
