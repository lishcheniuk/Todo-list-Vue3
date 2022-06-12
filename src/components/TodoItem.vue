<script setup lang="ts">
import { inject } from 'vue';
import type { ITodo } from '@/store/types';
import type { EditType, IProvideEditTodo } from '@/views/CreateNote.vue';

const props = defineProps<{
    todo: ITodo;
}>();

const modeEdit = inject<boolean>('modeEdit', false);
const injectEditTodo = inject<IProvideEditTodo | null>('provideEditTodo', null);

function handlerEdit(type: EditType) {
    injectEditTodo?.editTodo(props.todo.id, type)
}

function handlerRemove() {
    injectEditTodo?.removeTodo(props.todo.id)
}
</script>

<template>
    <li class="todo-item">
        <input
            :id="todo.id"
            class="todo-item__checkbox"
            type="checkbox"
            :disabled="!modeEdit"
            :checked="props.todo.isChecked"
            @change="handlerEdit('checkbox')"
        />
        <label :for="todo.id">{{ todo.title }}</label>

        <div
            class="todo-item__options"
            v-if="modeEdit"
        >
            <button
                class="options__btn"
                @click="handlerEdit('title')"
            >
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
                class="options__btn"
                @click="handlerRemove"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </li>
</template>

<style lang="less" scoped>
.todo-item {
    margin: 10px 0;
    display: flex;
    align-items: center;

    label {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex-grow: 1;
        margin: 0 10px;
        color: var(--note_color);
        filter: brightness(0.5);
    }

    &__options {
        display: flex;
        align-items: center;

        .options__btn {
            border: none;
            font-size: 20px;
            background-color: inherit;
            padding: 5px;
            cursor: pointer;
        }
    }

    &__checkbox {
        appearance: none;
        width: 25px;
        height: 25px;
        background-color: var(--secondary_color);
        border-radius: 50%;
        color: darken(#D3D3D3, 10%);
        text-align: center;
        transition: all 0.3s;
        flex-shrink: 0;

        &:checked {
            background-color: var(--green_color);
            color: #fff;
        }

        &::after {
            content: '\2714';
            font-size: 20px;
            line-height: 25px;
        }
    }
}
</style>