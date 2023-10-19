<template>
    <main>
      <div class="card-container" v-for="(item, i) in store.contacts" :key="i">
        <ContactCard :contact="item" @contact:delete="removeItem(i)" @contact:edit="editItem" @contact:read="readItem"/>
      </div>
      <button @click="addItem">Add Random Contact</button>
      <button @click="showAddForm">Add Custom Contact</button>
    </main>
  </template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { createContact } from '@/composable/contacts';
  import { useContactListStore } from '@/stores/contactList';
  import ContactCard from "@/components/Contacts/ContactCard.vue";

  // Router
  const router = useRouter();
  
  // Store
  const store = useContactListStore();

  const addItem = () => {
    store.contacts.push(createContact());
  };

  const removeItem = (index: number) => {
    store.contacts.splice(index, 1);
  };

  const showAddForm = () => {
    router.push('/contacts/add');
  }

  const editItem = (e: any) => {
    const id = e.id;
    router.push(`/contacts/${id}/edit`);
  }
  
  const readItem = (e: any) => {
    const id = e.id;
    router.push(`/contacts/${id}/read`);
  }
</script>

<style scoped>
  main {
    padding: 1.5rem 1rem;
  }
  .card-container {
    margin-bottom: 1.5rem;
  }
</style>