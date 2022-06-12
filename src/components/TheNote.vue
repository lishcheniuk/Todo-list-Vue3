<script setup lang="ts">
import { inject } from 'vue';
import TodoList from '@/components/TodoList.vue'
import type { INote, ITodo } from '@/store/types';

const props = defineProps<{
    note: INote;
    todoList: ITodo[];
}>();

const emit = defineEmits<{
    (e: 'addTodo'): void;
    (e: 'delete', id: string): void;
}>();

const modeEdit = inject<boolean>('modeEdit', false);
</script>

<template>
    <div
        class="note"
        :style="{ '--note_color': props.note.color }"
    >
        <h3 class="note__title">
            {{ props.note.title || 'Default note title' }}
        </h3>

        <TodoList :todoList="props.todoList" />

        <button
            v-if="modeEdit"
            class="add-todo-btn"
            title="Add Todo"
            @click="emit('addTodo')"
        >
            <i class="fa-solid fa-circle-plus"></i>
        </button>

        <div
            v-else
            class="note__options"
        >
            <router-link
                :to="`/edit/${note.id}`"
                class="options__btn"
                title="Edit Note"
            >
                <i class="fa-solid fa-file-pen"></i>
            </router-link>
            <a
                href="/"
                class="options__btn"
                @click.prevent="emit('delete', note.id)"
                title="Delete Note"
            >
                <i class="fa-solid fa-trash"></i>
            </a>
        </div>
    </div>
</template>

<style scoped lang="less">
.note {
    border-radius: 10px;
    box-shadow: 0px 0px 15px var(--secondary_color);
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(to right bottom, var(--note_color), #fff);
    transition: all 0.3s;

    &__title {
        margin-bottom: 20px;
        color: var(--note_color);
        filter: brightness(0.5);
        font-size: 26px;
        transition: all 0.3s;
    }

    &__options {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;

        a {
            filter: drop-shadow(0px 0px 5px #fff);
        }
    }

    .options__btn {
        font-size: 22px;
        padding: 5px;
    }

    .add-todo-btn {
        display: block;
        margin-left: auto;
        line-height: 1;
        border: none;
        cursor: pointer;
        border-radius: 50%;

        i {
            font-size: 28px;
        }
    }
}
</style>