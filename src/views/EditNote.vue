<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheNote from '@/components/TheNote.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useStore } from '@/store';
import CreateNoteOptions from '../components/CreateNoteOptions.vue';
import PopupAddTodo from '../components/PopupAddTodo.vue';
import type { INote } from '@/store/types';
import { useEditNote } from '@/hooks/useEditNote';

interface IHeaderBtn {
    title: string;
    icon: string;
    handler: () => void;
}

const headerBtn: IHeaderBtn[] = [
    { title: 'Cancel', icon: 'fa-reply-all', handler: setInitialValues },
    { title: 'Redo', icon: 'fa-rotate-left', handler: handlerRedo },
    { title: 'Undo', icon: 'fa-rotate-right', handler: handlerUndo }
];

const router = useRouter();
const route = useRoute();
const store = useStore();
const noteId = route.params.id;

const { noteRef, todoList, popupAddTodoRef, editTodo, addNewTodo } = useEditNote();

const getCurrentNote = computed(() => store.getters.getNotes.find((note: INote) => note.id === noteId));

onMounted(() => {
    setInitialValues();
});

function setInitialValues() {
    const { todos, ...other } = getCurrentNote.value;
    todoList.value = todos.concat();
    noteRef.value = other;
}

function handlerSaveNote() {
    store.commit('editNote', {
        ...noteRef.value,
        title: noteRef.value.title || 'Default note title',
        todos: todoList.value
    });
    router.push('/')
}

function handlerRedo() {
    console.log(43);

}

function handlerUndo() {
    console.log('undo');

}
</script>

<template>
    <div class="create-note">
        <the-header
            title="Note editing"
            showBtnBack
        >
            <template #options>
                <button
                    v-for="btn in headerBtn"
                    :key="btn.icon"
                    class="btn-edit-page btn-default"
                    :title="btn.title"
                    @click="btn.handler"
                >
                    <i :class="['fa-solid', btn.icon]"></i>
                </button>
                <button
                    class="btn-default"
                    @click="handlerSaveNote"
                    title="Save"
                >
                    <i class="fa-solid fa-floppy-disk"></i>
                    Save
                </button>
            </template>
        </the-header>

        <TheNote
            :note="noteRef"
            :todoList="todoList"
            @addTodo="popupAddTodoRef?.show();"
        />
        <CreateNoteOptions
            v-model:modelColor="noteRef.color"
            v-model:modelTitle.trim="noteRef.title"
        />
    </div>

    <PopupAddTodo
        ref="popupAddTodoRef"
        @add="addNewTodo"
        @edit="editTodo"
    />
</template>

<style lang="less" scoped>
.btn-edit-page {
    margin-right: 5px;

    i {
        margin-right: 0;
    }
}
</style>