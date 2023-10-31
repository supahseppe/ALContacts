<template>
    <div>
        <div class="entries" v-for="(phone, i) in entries" :key="i">
            <div class="entry">
                <div class="icon-col">
                    <PhoneIcon class="icon phone-icon" :class="`fill-${getPhoneTypeColor(phone.type)}`" />
                </div>
                <div class="fields">
                    <fieldset class="number">
                        <label>Phone Number</label>
                        <input type="tel" v-model="phone.number" @change="emit('update:phone', {phone, key: i})" />
                        <div
                            class="input-errors"
                            v-for="error of v$?.$each?.$response?.$errors[i]?.number"
                            :key="error.$uid"
                        >
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </fieldset>
                    <fieldset class="type center">
                        <label>Phone Type</label>
                        <select v-model="phone.type" @change="emit('update:phone', {phone, key: i})">
                            <option v-for="(val, key) in PHONE_TYPE" :key="key" :value="val" :selected="phone.type == val">{{ val }}</option>
                        </select>
                    </fieldset>
                    <fieldset class="primary center">
                        <label>Primary</label>
                        <ToggleInput v-model="phone.default" @change="emit('update:phone', {phone: phone, key: i} as PhoneUpdatePayload)" />
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="input-errors" v-for="error of v$?.entries?.errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        <button class="add-phone" @click.prevent="emit('add:phone')">Add new Phone Number</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PhoneIcon } from "@heroicons/vue/24/solid";
import { useVuelidate } from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { PHONE_TYPE, type PhoneUpdatePayload} from '@/types/Contact';
import { getPhoneTypeColor } from '@/composable/contacts';
import ToggleInput from '@/components/Input/ToggleInput.vue';

const props = defineProps(['phones', 'errors']);
const emit = defineEmits(['add:phone', 'update:phone'])

const entries = computed(() => props.phones);

const rules = computed(() => ({
    minLength: minLength(1),
    $each: helpers.forEach({
        number: { required },
    })
}));
const v$ = useVuelidate(rules, entries, { $lazy: true })

</script>

<style scoped>
.phone-header {
    font-size: 1.15em;
    border-bottom: 1px solid var(--indigo-wash);
}

.add-phone {
    margin-top: 1.5rem;

    button {
        margin-top: 1.5rem;
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

.entries {
    .entry {
        width: 100%;
        display: grid;
        gap: 0.5rem;
        grid-auto-flow: column dense;
        grid-template-columns: 2rem 1fr;

        @media (width >= 768px) {
            grid-template-columns: 3rem 1fr;
        }

        .fields {
            display: grid;
            grid-template-columns: 1fr 1fr;
            
            @media (width >= 768px) {
                grid-template-columns: 3fr 1fr 0.5fr;
            }
        }

        fieldset {
            &.number {
                grid-column: span 2;

                @media (width >= 768px) {
                    grid-column: auto;
                }
            }

            &.type,
            &.primary {
                display: grid;

                @media (width >= 768px) {
                    justify-content: center;
                }
            }
        }
    }

    select {
        width: 100%;
    }

    .input-errors {
        margin-top: 0;
    }
}
</style>