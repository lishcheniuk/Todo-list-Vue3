<script setup lang="ts">
import { colors } from '@/CONSTS';
import type { INote } from '@/store/types';

const props = defineProps<{
    note: INote;
}>();

const emit = defineEmits<{
    (e: 'editNote', note: INote): void;
}>();
</script>

<template>
    <div class="create-note__options">
        <ul class="color-list">
            <li
                v-for="(color, index) in colors"
                :key="index"
                class="color-item"
                :class="{ active: color === props.note.color }"
                :style="{ backgroundColor: color }"
                @click="emit('editNote', {...note, color})"
            ></li>
        </ul>

        <div class="title-note">
            <input
                type="text"
                :value="props.note.title"
                @input="emit('editNote',{...note, title: ($event.target as HTMLInputElement).value})"
                placeholder="Enter note title"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.create-note__options {
    margin-top: 30px;
}

.title-note {
    margin-top: 30px;

    input[type=text] {
        padding: 10px;
        font-size: 20px;
        width: 100%;
    }
}

.color-list {
    display: flex;
}

.color-item {
    width: 30px;
    height: 30px;
    border: 5px solid #fff;
    border-radius: 50%;
    margin-right: 5px;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
        transform: scale(1.1);
        box-shadow: 0 0 10px grey;
    }
}
</style>