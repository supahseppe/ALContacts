<template>
    <section v-if="contact">
        <header>
            <button @click="router.back">Back</button>
            <div class="action-btns">
                <button @click="router.push('/contacts')">Cancel</button>
                <button @click="saveContact">Save</button>
            </div>
        </header>
        <main>
            <div class="contact-persona">
                <figure>
                    <img src="https://picsum.photos/200/200" />
                </figure>
                <fieldset>
                    <label>Salutation</label>
                    <input :placeholder="`${ contact?.salutation ?? 'Mr, Ms, Etc.' }`" v-model="contact.salutation" />
                    <label>First Name</label>
                    <input v-model="contact.firstName" />
                    <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <label>Last Name</label>
                    <input v-model="contact.lastName" />
                    <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </fieldset>
            </div>
            <div class="contact-meta">
                <div class="icon-grid email">
                    <EnvelopeIcon />
                    <fieldset>
                        <label>Email Address</label>
                        <input v-model="contact.email" type="email" />
                        <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </fieldset>
                </div>
                <div class="icon-grid address">
                    <HomeModernIcon />
                    <div>
                        <fieldset class="street-addy">
                            <label>Street Address</label>
                            <input type="text" v-model="contact.address.street" />
                        </fieldset>
                        <fieldset class="addy-grid">
                            <div>
                                <label>City</label>
                                <input type="text" v-model="contact.address.city" />
                            </div>
                            <div>
                                <label>State</label>
                                <input type="text" v-model="contact.address.state" />
                            </div>
                            <div>
                                <label>Zip Code</label>
                                <input type="text" v-model="contact.address.zip" />
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="icon-grid address">
                    <BuildingOfficeIcon />
                    <fieldset>
                        <label>Company Name</label>
                        <input type="text" v-model="contact.companyName" />
                    </fieldset>
                </div>
                <div class="add-phone">
                    <p>Contact Phone Numbers</p>
                    <div class="entries" v-for="(entry, i) in contact?.phone" :key="i">
                        <fieldset>
                            <label>Phone Number</label>
                            <input type="text" v-model="entry.number" />
                        </fieldset>
                        <fieldset>
                            <label>Phone Type</label>
                            <select v-model="entry.type">
                                <option v-for="(val, key) in PHONE_TYPE" :value="val" :key="key">{{ val }}</option>
                            </select>
                        </fieldset>
                        <fieldset class="center">
                            <label>Primary</label>
                            <input type="checkbox" v-model="entry.default" @change="swapDefaults(entry, i)" />
                        </fieldset>
                    </div>
                    <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <button @click="addPhone">Add new Phone Number</button>
                </div>
            </div>
        </main>
        <footer>
            <button @click="router.back">Back</button>
            <div class="action-btns">
                <button @click="router.push('/contacts')">Cancel</button>
                <button @click="saveContact">Save</button>
            </div>
        </footer>
    </section>
</template>

<script setup lang="ts">
    import { computed, reactive, unref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { BuildingOfficeIcon, PhoneIcon, EnvelopeIcon, HomeModernIcon } from "@heroicons/vue/24/solid";
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    import { PHONE_TYPE, type Contact, type PhoneEntry } from '@/types/Contact';
    import { contactFactory, phoneFactory } from '@/composable/contacts';
    import { useContactListStore } from '@/stores/contactList';

    // Routee
    const router = useRouter();
    const route = useRoute();
    
    // Store
    const store = useContactListStore();

    // Contact
    const id = route.params.id as string;
    const index = store.getContactIndexByID(id);
    let contact = reactive(contactFactory());

    // Form actions
    const swapDefaults = (phone:PhoneEntry, key: number) => {
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

    const toRead = () => router.push(`/contacts/${contact.id}/read`);

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
            store.contacts.push(unref(contact));
            toRead();
        }
    };
</script>

<style scoped lang="scss">
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

    fieldset {
        display: grid;
        gap: 0.5rem;
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

    .add-phone {
        .entries {
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: 2fr 1fr 0.5fr;
        }
    }

    .addy-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        & > div {
            display: grid;
            gap: 0.5rem;
        }
    }
</style>