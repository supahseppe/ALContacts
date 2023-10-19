import { ref } from 'vue'
import { defineStore } from 'pinia'
import { find, findIndex } from 'lodash';
import { type Contact } from '@/types/Contact';

export const useContactListStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([]);

  const getContactByID = function (id: string) {
    return find(contacts.value, (c) => c.id === id);
  }
  
  const getContactIndexByID = function (id: string) {
    return findIndex(contacts.value, (c) => c.id === id);
  }

  const deleteContactByID = (id: string) => {
    const index = getContactIndexByID(id);
    contacts.value.splice(index, 1);
  }

  return { contacts, getContactByID, getContactIndexByID, deleteContactByID };
})
