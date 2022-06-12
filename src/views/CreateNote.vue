<script setup lang="ts">
import { useRouter } from 'vue-router';
import TheNote from '@/components/TheNote.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useStore } from '@/store';
import CreateNoteOptions from '../components/CreateNoteOptions.vue';
import PopupAddTodo from '../components/PopupAddTodo.vue';
import { useEditNote } from '@/hooks/useEditNote';

const router = useRouter();
const store = useStore();
const { noteRef: note, todoList, popupAddTodoRef, editTodo, addNewTodo } = useEditNote();

function handlerSaveNote() {
    store.commit('saveNote', {
        ...note.value,
        title: note.value.title || 'Default note title',
        todos: todoList.value
    });
    router.push('/')
}
</script>

<template>
    <div class="create-note">
        <the-header
            title="Create a new note"
            showBtnBack
        >
            <template #options>
                <button
                    class="btn-default"
                    @click="handlerSaveNote"
                >
                    <i class="fa-solid fa-floppy-disk"></i>
                    Save Note
                </button>
            </template>
        </the-header>

        <TheNote
            :note="note"
            :todoList="todoList"
            @addTodo="popupAddTodoRef?.show();"
        />
        <CreateNoteOptions
            v-model:modelColor="note.color"
            v-model:modelTitle.trim="note.title"
        />
    </div>

    <PopupAddTodo
        ref="popupAddTodoRef"
        @add="addNewTodo"
        @edit="editTodo"
    />
</template>

<style lang="less" scoped>
</style>