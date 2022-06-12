<script setup lang="ts">
import { ref } from 'vue';
import PopupWrapper from '../components/PopupWrapper.vue';
import type { ITodo } from '@/store/types';

type TitleBtnType = 'Add' | 'Edit';

const popupWrapperRef = ref();
const inputAddTodo = ref<string>('');
const editingTodo = ref<ITodo | null>(null)
const titleBtn = ref<TitleBtnType>('Add')

const emit = defineEmits<{
    (e: 'add', todo: ITodo): void;
    (e: 'edit', todo: ITodo): void;
}>();

defineExpose({ show });

function handlerAddTodo() {
    const inputVal = inputAddTodo.value.trim();
    if (!inputVal) return;

    if (editingTodo.value) {
        emit('edit', { ...editingTodo.value, title: inputAddTodo.value })
    } else {
        const newTodo = {
            id: Date.now().toString(),
            isChecked: false,
            title: inputVal
        }
        emit('add', newTodo);
    }

    if (editingTodo.value) editingTodo.value = null;
    show();
}

function show(todo?: ITodo) {
    if (todo) {
        editingTodo.value = todo;
        inputAddTodo.value = todo.title;
    }

    titleBtn.value = todo ? 'Edit' : 'Add';
    popupWrapperRef.value.switchVisibility()
}

function closePopup() {
    if (editingTodo.value) editingTodo.value = null;
    if (inputAddTodo.value) inputAddTodo.value = '';
}
</script>

<template>
    <popup-wrapper
        ref="popupWrapperRef"
        @close="closePopup"
    >
        <template #content>
            <div class="add-todo">
                <input
                    class="add-todo__input"
                    type="text"
                    v-model="inputAddTodo"
                    placeholder="Add todo"
                    @keydown.enter="handlerAddTodo"
                />
                <button
                    class="add-todo__btn btn-default"
                    @click="handlerAddTodo"
                >{{ titleBtn }}</button>
            </div>
        </template>
    </popup-wrapper>
</template>

<style lang="less" scoped>
.add-todo {
    display: flex;
}

.add-todo__input {
    padding: 10px;
    font-size: 20px;
    flex-grow: 1;
}

.add-todo__btn {
    border-radius: initial;
}
</style>