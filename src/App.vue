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
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contacts">Contacts</RouterLink>
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.main_grid {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 3fr;
  gap: 2rem;
  padding: 6rem 2rem 2rem 2rem;
  border-radius: var(--general-border-radius);
}

.main_view {
  background-color: white;
  position: relative;
  border-radius: var(--general-border-radius);
}

nav {
  background-color: white;
  border-radius: var(--general-border-radius);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

</style>
