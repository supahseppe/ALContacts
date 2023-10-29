<template>
    <section v-if="contact && contact?.id">
        <header>
            <button @click="router.back">Back</button>
            <div class="action-btns">
                <button @click="toRead">Cancel</button>
                <button @click="saveContact">Save</button>
            </div>
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
                <div v-for="(phone, i) in contact.phone" :key="i">
                    <div class="icon-grid phone">
                        <PhoneIcon />
                        <div class="grid">
                            <p>{{ phone.number }}</p>
                            <select v-model="phone.type">
                                <option v-for="(val, key) in PHONE_TYPE" :key="key" :value="val" :selected="phone.type == val">{{ val }}</option>
                            </select>
                            <div>
                                <label>Default?</label>
                                <input type="checkbox" v-model="phone.default" @change="swapDefaults(phone, i)" />
                            </div>
                        </div>
                    </div>
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
            <button @click="router.back">Back</button>
            <div class="action-btns">
                <button @click="toRead">Cancel</button>
                <button @click="saveContact">Save</button>
            </div>
        </footer>
    </section>
</template>

<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router';
    import { PhoneIcon, EnvelopeIcon, HomeModernIcon } from "@heroicons/vue/24/solid";
    import { isEmpty } from 'lodash';
    import { PHONE_TYPE, type Contact, type PhoneEntry } from '@/types/Contact';
    import { useContactListStore } from '@/stores/contactList';

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

    const swapDefaults = (phone:PhoneEntry, key: number) => {
        if (phone.default) {
            for (let i = 0; i < contact.phone.length; i++) {
                if (i !== key) {
                    contact.phone[i].default = false;
                }
            }
        }
    }

    const saveContact = () => {
        store.contacts[index] = contact;
        toRead();
    };
</script>

<style scoped>
    header,
    footer,
    main {
        padding: 1.5rem 1rem;
    }

    fieldset {
        border: none;
    }

    header,
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: lightgray;

        .action-btns {
            display: grid;
            gap: 1rem;
            grid-auto-flow: column;
        }
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

    .phone {
        max-width: 75%;
        .grid {
            display: grid;
            gap: 1rem;
            grid-auto-flow: column;
            grid-template-columns: 1.5fr 1fr 1fr;
        }
    }
</style>