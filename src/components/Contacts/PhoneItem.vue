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
import { getPhoneTypeColor } from '@/composable/contacts';

const props = defineProps({
    phone: Object as PropType<PhoneEntry>
});

const phoneColor = computed(() => {
    if (!props?.phone?.type) {
        return '';
    }
    return getPhoneTypeColor(props.phone.type);
});

const iconColor = computed(() => {
    if (!props?.phone?.type) {
        return '';
    }
    return 'fill-' + getPhoneTypeColor(props.phone.type);
});

</script>