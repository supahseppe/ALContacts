<template>
    <label class="toggle">
        <input type="checkbox" :value="modelValue" :checked="modelValue" @input="$emit('update:modelValue', ($event?.target as any)?.checked)">
        <span class="slider"></span>
    </label>
</template>

<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
.toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: gray;
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
}
    
input:checked+.slider {
    background-color: green;
}
    
input:checked+.slider:before {
    transform: translateX(26px);
}
</style>