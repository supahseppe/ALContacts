<template>
  <div class="layout_wrapper">
    <header>
      <div class="logo">
        <Logo />
      </div>
    </header>
    <section class="main_grid">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contacts/browse">Browse Contacts</RouterLink>
        <RouterLink to="/contacts/add">Add Contact</RouterLink>
      </nav>
      <section class="main_view">
        <RouterView />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Logo from '@/components/Logo.vue'
</script>

<style scoped>
header {
  display: grid;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  width: 100vw;
  height: 4rem;
  position: fixed;
  border-bottom: 4px solid var(--indigo);
  z-index: 10;
}

.main_grid {
  display: grid;
  gap: 1.5rem;
  grid-auto-flow: row dense;
  grid-template-rows: min-content 1fr;
  padding-top: 4rem;
  border-radius: var(--general-border-radius);
  min-height: 100vh;
  max-width: 100vw;
  background-color: var(--cement);

  @media (width >= 1024px) {
    grid-auto-flow: column dense;
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto;
    gap: 0;
  }
}

.main_view {
  background-color: #f9f9f9;
  position: relative;
  padding: 0rem 1rem 3rem 1rem;

  @media (width >= 1024px) {
    padding: 1rem 1rem 3rem 1rem;
  }
}

nav {
  padding: 1rem 0rem;
  background-color: var(--indigo-wash);
}

nav a.router-link-exact-active {
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0 1rem;
  color: var(--indigo-shadow);
}

nav a:first-of-type {
  border: 0;
}

</style>
