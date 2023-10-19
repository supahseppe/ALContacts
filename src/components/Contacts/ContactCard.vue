<template>
    <div class="contact-card" v-if="contact">
        <div class="contact-persona">
            <img v-if="contact?.avatar" :src="contact.avatar" width="140" height="140" />
            <p class="contact-name">{{ getFullName(contact) }}</p>
        </div>
        <div class="contact-meta">
            <div class="email">
                <EnvelopeIcon />
                <p>{{ contact?.email }}</p>
            </div>
            <div class="phone">
                <PhoneIcon />
                <p>{{ phone?.number }} ({{ phone?.type }})</p>
            </div>
        </div>
        <div class="dropdown">
            <button @click="toggleDropdownMenu">
                Actions
            </button>
            <div v-if="dropdownState === 'open'" class="dropdown-menu">
                <a @click="emit('contact:read', { id: contact?.id })">Details</a>
                <a @click="emit('contact:edit', { id: contact?.id })">Edit</a>
                <a @click="emit('contact:delete', { id: contact?.id })">Remove</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type PropType, ref, computed } from 'vue';
    import { PhoneIcon, EnvelopeIcon } from "@heroicons/vue/24/solid";
    import { type Contact, type PhoneEntry } from '@/types/Contact';
    import { getDefaultNumber, getFullName } from '@/composable/contacts';

    const props = defineProps({
        contact: Object as PropType<Contact>,
    })

    const emit = defineEmits(['contact:delete', 'contact:edit', 'contact:read']);

    const dropdownState = ref('closed');

    const toggleDropdownMenu = () => {
        dropdownState.value = dropdownState.value === 'closed' ? 'open' : 'closed';
    };

    const phone = computed(() => {
        if (props?.contact) {
            return getDefaultNumber(props.contact) as PhoneEntry;
        }
        return { number: '', type: '' };
    });
</script>

<style lang="scss" scoped>
    .contact-card {
        padding: 1.5rem 1rem;
        border: 1px solid #ccc;
        display: grid;
        gap: 1rem;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr 0.25fr;
        border-radius: var(--general-border-radius);
    }

    .contact-persona {
        display: grid;
        gap: 1rem;
        grid-auto-flow: column;
        grid-template-columns: 3rem 1fr;
        align-items: center;

        .contact-name {
            font-size: 1.2em;
        }

        img {
            max-width: 3rem;
            height: auto;
            border-radius: 50%;
        }
    }

    .contact-meta {
        display: grid;
        gap: 1rem;

        & > div {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            grid-template-columns: 24px 1fr;
            align-items: center;
        }
        svg {
            max-width: 24px;
            height: auto;
        }
    }

    .dropdown {
        position: relative;
        display: inline-block;
        padding: 1rem;

        .dropdown-menu {
            display: grid;
            margin: 1rem;
            padding: 0.25rem;
            text-align: center;
            position: absolute;
            top: 1.5rem;
            right: 0;
            width: 120px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border-radius: var(--general-border-radius);
            border: 1px solid gray;
            z-index: 1;
        }
    }
</style>