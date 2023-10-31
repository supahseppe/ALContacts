<template>
    <form>
        <div class="contact-persona">
            <div class="icon-col">
                <UserIcon class="icon" />
            </div>
            <figure>
                <figcaption>Avatar</figcaption>
                <img src="https://picsum.photos/200/200" />
            </figure>
            <fieldset>
                <label for="salutation">Salutation</label>
                <input
                    id="salutation"
                    :placeholder="`${ model?.salutation ?? 'Mr, Ms, Etc.' }`"
                    v-model="model.salutation"
                    @change="emit('update:contact', model)"
                />
                <label for="first_name">First Name</label>
                <input
                    id="first_name"
                    v-model="model.firstName"
                    @change="emit('update:contact', model)"
                />
                <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <label for="last_name">Last Name</label>
                <input
                    id="last_name"
                    v-model="model.lastName"
                    @change="emit('update:contact', model)"
                />
                <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </fieldset>
        </div>
        <div class="contact-meta">
            <div class="icon-grid email">
                <div class="icon-col">
                    <EnvelopeIcon class="icon" />
                </div>
                <fieldset>
                    <label for="email">Email Address</label>
                    <input
                        id="email"
                        v-model="model.email"
                        type="email"
                        @change="emit('update:contact', model)"
                    />
                    <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </fieldset>
            </div>
            <div class="icon-grid address">
                <div class="icon-col">
                    <HomeModernIcon class="icon" />
                </div>
                <div>
                    <fieldset class="street-addy">
                        <label for="address">Street Address</label>
                        <input id="address" type="text" v-model="model.address.street" @change="emit('update:contact', model)" />
                    </fieldset>
                    <fieldset class="addy-grid">
                        <div>
                            <label for="city">City</label>
                            <input id="city" type="text" v-model="model.address.city" @change="emit('update:contact', model)" />
                        </div>
                        <div>
                            <label for="state">State</label>
                            <input id="state" type="text" v-model="model.address.state" @change="emit('update:contact', model)" />
                        </div>
                        <div>
                            <label for="zip">Zip Code</label>
                            <input id="zip" type="text" v-model="model.address.zip" @change="emit('update:contact', model)" />
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="icon-grid address">
                <div class="icon-col">
                    <BuildingOfficeIcon class="icon" />
                </div>
                <fieldset>
                    <label for="company">Company Name</label>
                    <input id="company" type="text" v-model="model.companyName" @change="emit('update:contact', model)" />
                </fieldset>
            </div>
            <div class="phones">
                <p class="phone-header">Phone Numbers</p>
                <PhoneEntryWidget :phones="model.phone" :errors="v$?.phone?.$errors" @add:phone="emit('add:phone')" @update:phone="sendUpdatePhone" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { type PropType, computed, reactive } from 'vue';
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    import { EnvelopeIcon, HomeModernIcon, BuildingOfficeIcon, UserIcon } from "@heroicons/vue/24/solid";
    import { type Contact, type PhoneUpdatePayload } from '@/types/Contact';
    import { contactFactory } from '@/composable/contacts';
    import PhoneEntryWidget from '@/components/Contacts/PhoneEntryWidget.vue';

    const props = defineProps({
        contact: {
            type: Object as PropType<Contact>,
            default: () => contactFactory(),
        }
    })
    const emit = defineEmits(['update:contact', 'add:phone', 'update:phone'])

    const sendUpdatePhone = (payload: PhoneUpdatePayload) => {
        emit('update:phone', payload);
    };

    const model = reactive({...props.contact});

    // Validation
    const rules = computed(() => ({
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phone: {
            required,
            minLength: minLength(1)
        },
    }));

    const v$ = useVuelidate(rules, model, { $lazy: true });
</script>

<style scoped>
    fieldset {
        display: grid;
        gap: 0.5rem;
    }

    .contact-persona {
        display: grid;
        gap: 0.5rem;
        align-items: center;
        grid-template-columns: 2rem 1fr;
        margin-bottom: 1.5rem;

        @media (width >= 768px) {
            gap: 1rem;
            grid-template-columns: 3rem 12rem 1fr;
        }

        .icon-col {
            grid-row: span 2;

            @media (width >= 768px) {
                grid-row: auto;
            }
        }

        figure,
        img {
            max-width: 100%;
            min-width: 100%;
            height: auto;
        }

        figure {
            width: 12rem;
            height: auto;
            border-radius: var(--general-border-radius);
            overflow: hidden;

            @media (width >= 768px) {
                height: 12rem;
            }
        }
        
    }

    .contact-meta {
        display: grid;
        gap: 1rem;
    }

    .icon-grid {
        display: grid;
        gap: 0.5rem;
        grid-auto-flow: column;
        grid-template-columns: 2rem 1fr;
        align-items: center;

        label {
            margin-right: 0.5rem;
        }

        @media (width >= 768px) {
            grid-template-columns: 3rem 1fr;
        }
    }

    .icon-col {
        display: grid;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        border-right: 2px solid var(--indigo-tint);

        .icon {
            min-width: 1.5rem;
            height: auto;

            @media (min-width >= 768px) {
                min-width: 2rem;
            }
        }
    }

    .phone-header {
        font-size: 1.15em;
        border-bottom: 1px solid var(--indigo-wash);
        margin-bottom: 0.5rem;
    }

    .add-phone {
        margin-top: 1.5rem;

        button {
            margin-top: 1.5rem;
        }
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