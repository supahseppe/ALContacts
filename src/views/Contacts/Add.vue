<template>
    <section v-if="contact">
        <header>
            <ActionHeaderFooter
                @action:back="router.back"
                @action:cancel="router.push('/contacts')"
                @action:save="saveContact"
            />
        </header>
        <main>
            <AddEditForm v-model:contact="contact" @add:phone="addPhone" @update:phone="swapDefaults" />
        </main>
        <footer>
            <ActionHeaderFooter
                @action:back="router.back"
                @action:cancel="router.push('/contacts')"
                @action:save="saveContact"
            />
        </footer>
    </section>
</template>

<script setup lang="ts">
    import { computed, reactive, unref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useVuelidate } from '@vuelidate/core';
    import { type PhoneUpdatePayload } from '@/types/Contact';
    import { contactFactory, phoneFactory } from '@/composable/contacts';
    import { useContactListStore } from '@/stores/contactList';
    import ActionHeaderFooter from '@/components/Contacts/ActionHeaderFooter.vue';
    import AddEditForm from '@/components/Contacts/AddEditForm.vue';

    // Routee
    const router = useRouter();
    const route = useRoute();
    
    // Store
    const store = useContactListStore();

    // Contact
    const id = route.params.id as string;
    let contact = reactive(contactFactory());

    // Form actions
    const swapDefaults = (payload: PhoneUpdatePayload) => {
        console.log('payload', payload);
        if (payload.phone.default) {
            for (let i = 0; i < contact.phone.length; i++) {
                if (i !== payload.key) {
                    contact.phone[i].default = false;
                }
            }
        }
    }

    const addPhone = () => {
        console.log(contact.phone);
        contact.phone.push(phoneFactory())
    };

    const toRead = () => router.push(`/contacts/${contact.id}/read`);

    // Validation
    const v$ = useVuelidate();

    const saveContact = async () => {
        const valid = await v$.value.$validate();
        if (valid) {
            store.contacts.push(unref(contact));
            toRead();
        }
    };
</script>

<style scoped>
    header,
    footer {
        background-color: var(--indigo-wash);
    }

    header,
    footer,
    main {
        padding: 1.5rem 1rem;
    }

    main {
        background-color: var(--white);
    }
</style>