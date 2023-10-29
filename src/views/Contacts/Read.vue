<template>
    <section v-if="contact && contact?.id">
        <header>
            <button @click="router.push('/contacts/browse')">Back</button>
            <div>
                <button @click="deleteContactWarning">Delete</button>
                <button @click="router.push(`/contacts/${id}/edit`)">Edit</button>
            </div>
        </header>
        <main>
            <div class="contact-persona">
                <img :src="contact?.avatar" />
                <h1>{{ getFullName(contact) }}</h1>
            </div>
            <div class="contact-meta">
                <div class="icon-grid email">
                    <EnvelopeIcon />
                    <p>{{ contact?.email }}</p>
                </div>
                <div v-for="(phone, i) in contact.phone" :key="i">
                    <PhoneItem :phone="phone" />
                </div>
                <div class="icon-grid address" v-if="!isEmpty(contact?.address)">
                    <HomeModernIcon />
                    <div>
                        <p>{{ contact?.address?.street }}</p>
                        <p>{{ contact?.address?.city }} {{ contact?.address?.state }}, {{ contact?.address?.zip }}</p>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <button @click="addPhone({ type: PHONE_TYPE.HOME })">Add Home Phone</button>
            <button @click="addPhone({ type: PHONE_TYPE.WORK })">Add Work Phone</button>
        </footer>
    </section>
</template>

<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router';
    import { EnvelopeIcon, HomeModernIcon } from "@heroicons/vue/24/solid";
    import { isEmpty } from 'lodash';
    import { PHONE_TYPE } from '@/types/Contact';
    import { createPhone, getFullName } from '@/composable/contacts';
    import { useContactListStore } from '@/stores/contactList';
    import PhoneItem from '../../components/Contacts/PhoneItem.vue';

    // Routee
    const router = useRouter();
    const route = useRoute();
    
    // Store
    const store = useContactListStore();

    // Contact
    const id = route.params.id as string;
    const contact = store.getContactByID(id);

    const addPhone = (type: any) => {
        if (contact) {
            contact.phone.push(createPhone({type, isDefault: false}));
        }
    }

    const deleteContactWarning = () => {
        alert("This is where I'd give you a chance to change your mind in a nice modal. But not today. Today we play for keeps.");
        deleteContact();
    }

    const deleteContact = () => {
        store.deleteContactByID(id);
        router.push('/contacts');
    }
</script>

<style scoped>
    header,
    main,
    footer {
        padding: 1.5rem 1rem;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .contact-persona {
        display: grid;
        gap: 0.5rem;
        grid-auto-flow: column;
        grid-template-columns: 48px 1fr;
        align-items: center;
        margin-bottom: 1.5rem;

        h1 {
            font-size: 1.4rem;
        }

        img {
            max-width: 100%;
        }
    }

    .contact-meta {
        display: grid;
        gap: 1.5rem;
    }
    .icon-grid {
        display: grid;
        gap: 0.5rem;
        grid-auto-flow: column;
        grid-template-columns: 24px 1fr;
    }
</style>