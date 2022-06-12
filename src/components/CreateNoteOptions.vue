<script setup lang="ts">
import { colors } from '@/CONSTS';

const props = defineProps<{
    modelTitle: string;
    modelColor: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelColor', color: string): void;
    (e: 'update:modelTitle', title: string): void;
}>();
</script>

<template>
    <div class="create-note__options">
        <ul class="color-list">
            <li
                v-for="(color, index) in colors"
                :key="index"
                class="color-item"
                :class="{ active: color === props.modelColor }"
                :style="{ backgroundColor: color }"
                @click="emit('update:modelColor', color)"
            ></li>
        </ul>

        <div class="title-note">
            <input
                type="text"
                :value="props.modelTitle"
                @input="emit('update:modelTitle', ($event.target as HTMLInputElement).value)"
                placeholder="Enter note title"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.create-note__options {
    margin-top: 20px;
}

.title-note {
    margin-top: 20px;

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