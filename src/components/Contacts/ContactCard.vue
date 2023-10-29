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
        <div class="actions">
            <a @click="emit('contact:read', { id: contact?.id })">Details</a>
            <a @click="emit('contact:edit', { id: contact?.id })">Edit</a>
            <a @click="emit('contact:delete', { id: contact?.id })">Remove</a>
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

<style scoped>
    .contact-card {
        padding: .75rem 0.5rem;
        background-color: white;
        display: grid;
        gap: 1rem;
        border-radius: var(--general-border-radius);
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
            border-radius: var(--general-border-radius);
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

    .actions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        text-align: center;
    }
</style>