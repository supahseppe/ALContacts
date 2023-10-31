<template>
    <div class="action-bar">
        <button v-if="backBtn" @click="emit('action:back')">Back</button>
        <div class="action-btns">
            <button v-if="cancelBtn" class="bg-red" @click="emit('action:cancel')">Cancel</button>
            <button v-if="deleteBtn" class="bg-red" @click="emit('action:delete')">Delete</button>
            <button v-if="editBtn" class="bg-olive" @click="emit('action:edit')">Edit</button>
            <button v-if="saveBtn" class="bg-olive" @click="emit('action:save')">Save</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    backBtn: {
        type: Boolean,
        default: true,
    },
    cancelBtn: {
        type: Boolean,
        default: true,
    },
    deleteBtn: {
        type: Boolean,
        default: false,
    },
    editBtn: {
        type: Boolean,
        default: false,
    },
    saveBtn: {
        type: Boolean,
        default: true,
    },
})
const emit = defineEmits(['action:back', 'action:cancel', 'action:delete', 'action:edit', 'action:save'])
</script>

<style scoped>
    .action-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .action-btns {
            display: grid;
            gap: 1rem;
            grid-auto-flow: column;
            margin-left: auto;
        }
    }
</style>