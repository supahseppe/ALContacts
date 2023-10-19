<template>
    <div class="icon-grid phone">
        <PhoneIcon :class="iconColor" />
        <p :class="phoneColor">{{ phone?.type }}: {{ phone?.number }}<span v-if="phone?.default"> [Default]</span></p>
    </div>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { PhoneIcon } from "@heroicons/vue/24/solid";
import { type PhoneEntry, PHONE_TYPE } from '../../types/Contact';

const props = defineProps({
    phone: Object as PropType<PhoneEntry>
});

const phoneColor = computed(() => {
    if (!props?.phone?.type) {
        return '';
    }
    switch (props.phone.type) {
        case PHONE_TYPE.MOBILE:
            return 'purple';
        case PHONE_TYPE.HOME:
            return 'olive';
        case PHONE_TYPE.WORK:
            return 'red';
        default: 
            return 'black';
    }
});

const iconColor = computed(() => {
    if (!props?.phone?.type) {
        return '';
    }
    switch (props.phone.type) {
        case PHONE_TYPE.MOBILE:
            return 'fill-purple';
        case PHONE_TYPE.HOME:
            return 'fill-olive';
        case PHONE_TYPE.WORK:
            return 'fill-red';
        default: 
            return 'fill-black';
    }
});

</script>