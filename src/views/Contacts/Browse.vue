<template>
    <main>
      <div class="card-container">
        <ContactCard
          v-for="(item, i) in store.contacts"
          :key="i"
          :contact="item"
          @contact:delete="removeItem(i)"
          @contact:edit="editItem"
          @contact:read="readItem"
        />
      </div>
      <div class="grid">
        <button @click="addItem(1)">Add Random Contact</button>
        <button @click="addItem(10)">Add 10 Random Contacts</button>
        <button @click="showAddForm">Add Custom Contact</button>
      </div>
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

  const addItem = (items = 1) => {
    for (let i = 0; i < items; i++) {
      store.contacts.push(createContact());
    }
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
    display: grid;
    gap: 1rem;
    
    @media (width >= 768px) {
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    }
  }
</style>