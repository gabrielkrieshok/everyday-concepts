<template>
  <header
    id="header"
    class="header bg-blue-900 flex flex-col md:flex-row md:justify-between items-center p-4 md:p-6"
    role="banner"
  >
    <g-link
      class="company-logo-link block text-white font-bold text-2xl md:text-3xl hover:text-blue-500 handwriting"
      to="/"
      aria-label="Back to home"
    >Everyday Concepts</g-link>

    <nav id="nav" class="nav hidden md:flex">
      <ul class="menu flex flex-col md:flex-row items-center list-reset text-base">
        <li
          class="level-1 mb-4 md:mr-4 md:mb-0"
          v-for="element in $static.metadata.menu"
          :key="element.name"
        >
          <g-link
            :to="element.link"
            class="link font-bold text-white hover:text-blue-500"
            active-class="is-active-link"
            exact-active-class="active text-blue-500"
          >{{ element.name }}</g-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    menu {
      name
      link
    }
  }
}
</static-query>