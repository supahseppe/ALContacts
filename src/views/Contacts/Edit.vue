<template>
    <section v-if="contact && contact?.id">
        <header>
            <ActionHeaderFooter
                @action:back="router.back"
                @action:cancel="router.push('/contacts')"
                @action:save="saveContact"
            />
        </header>
        <main>
            <div class="contact-persona">
                <figure>
                    <img :src="contact?.avatar" />
                </figure>
                <fieldset>
                    <label>Salutation</label>
                    <input :placeholder="`${ contact?.salutation ?? 'Mr, Ms, Etc.' }`" v-model="contact.salutation" />
                    <label>First Name</label>
                    <input v-model="contact.firstName" />
                    <label>Last Name</label>
                    <input v-model="contact.lastName" />
                </fieldset>
            </div>
            <div class="contact-meta">
                <div class="icon-grid email">
                    <EnvelopeIcon />
                    <fieldset>
                        <label>Email Address</label>
                        <input v-model="contact.email" type="email" />
                    </fieldset>
                </div>
                <div class="phones">
                    <p class="phone-header">Phone Numbers</p>
                    <PhoneEntryWidget :phones="contact.phone" @add:phone="addPhone" @update:phone="updatePhone" />
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
            <ActionHeaderFooter
                @action:back="router.back"
                @action:cancel="router.push('/contacts')"
                @action:save="saveContact"
            />
        </footer>
    </section>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { EnvelopeIcon, HomeModernIcon } from "@heroicons/vue/24/solid";
    import { isEmpty } from 'lodash';
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    import { type Contact, type PhoneEntry } from '@/types/Contact';
    import { phoneFactory } from '@/composable/contacts';
    import { useContactListStore } from '@/stores/contactList';
    import PhoneEntryWidget from '@/components/Contacts/PhoneEntryWidget.vue';
    import ActionHeaderFooter from '@/components/Contacts/ActionHeaderFooter.vue';

    // Routee
    const router = useRouter();
    const route = useRoute();
    const toRead = () => router.push(`/contacts/${id}/read`);
    
    // Store
    const store = useContactListStore();

    // Contact
    const id = route.params.id as string;
    const index = store.getContactIndexByID(id);
    let contact = { ...store.contacts[index] } as Contact;

    type phoneUpdatePayload = {
        phone: PhoneEntry,
        key: number,
    }
    const updatePhone = (payload: phoneUpdatePayload) => {
        const { phone, key } = payload;
        Object.assign(contact.phone[key], phone);
        if (phone.default) {
            for (let i = 0; i < contact.phone.length; i++) {
                if (i !== key) {
                    contact.phone[i].default = false;
                }
            }
        }
    }

    const addPhone = () => {
        contact.phone.push(phoneFactory())
    };

    // Validation
    const rules = computed(() => ({
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phone: { required, minLength: minLength(1) }
    }));
    
    const v$ = useVuelidate(rules, contact, { $lazy: true });

    const saveContact = async () => {
        const valid = await v$.value.$validate();
        if (valid) {
            store.contacts[index] = contact;
            toRead();
        }
    };
</script>

<style scoped>
    header,
    footer {
        background: var(--indigo-wash);
    }
    
    header,
    footer,
    main {
        padding: 1.5rem 1rem;
    }

    .contact-persona {
        display: grid;
        gap: 0.5rem;
        grid-auto-flow: column;
        grid-template-columns: 200px 1fr;
        align-items: center;
        margin-bottom: 1.5rem;

        figure,
        img {
            max-width: 100%;
            min-width: 100%;
            height: auto;
        }

        figure {
            width: 200px;
            height: 200px;
            border-radius: var(--general-border-radius);
            overflow: hidden;
        }

        fieldset {
            display: grid;
            gap: 0.5rem;
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
        align-items: center;

        label {
            margin-right: 0.5rem;
        }
    }
</style>