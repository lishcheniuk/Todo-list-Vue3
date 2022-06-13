<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheNote from '@/components/TheNote.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useStore } from '@/store';
import CreateNoteOptions from '../components/CreateNoteOptions.vue';
import PopupAddTodo from '../components/PopupAddTodo.vue';
import PopupConfirm from '@/components/PopupConfirm.vue'
import type { INote } from '@/store/types';
import { useEditNote } from '@/hooks/useEditNote';

interface IHeaderBtn {
    title: string;
    icon: string;
    disabled: boolean;
    handler: () => void;
}

const router = useRouter();
const route = useRoute();
const store = useStore();
const popupConfirmRef = ref();
const noteId = route.params.id;

const { noteRef, todoList, popupAddTodoRef, undoList, redoList, editTodo, addNewTodo, handlerRedo, handlerUndo, editNote } = useEditNote();

const headerBtn = computed<IHeaderBtn[]>(() => (
    [
        { title: 'Cancel', icon: 'fa-reply-all', disabled: redoList.value.length < 2, handler: cancelAllChanges },
        { title: 'Redo', icon: 'fa-rotate-left', disabled: !redoList.value.length, handler: handlerRedo },
        { title: 'Undo', icon: 'fa-rotate-right', disabled: !undoList.value.length, handler: handlerUndo }
    ]
));

const getCurrentNote = computed(() => store.getters.getNotes.find((note: INote) => note.id === noteId));

onMounted(() => {
    setInitialValues();
});

function setInitialValues() {
    const { todos, ...other } = getCurrentNote.value;
    todoList.value = todos.concat();
    noteRef.value = other;

    if (undoList.value.length || redoList.value.length) {
        undoList.value = [];
        redoList.value = [];
    }
}

function handlerSaveNote() {
    store.commit('editNote', {
        ...noteRef.value,
        title: noteRef.value.title || 'Default note title',
        todos: todoList.value
    });
    router.push('/')
}

function cancelAllChanges() {
    popupConfirmRef.value.show(setInitialValues);
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
                    :disabled="btn.disabled"
                    @click="btn.handler"
                >
                    <i :class="['fa-solid', btn.icon]"></i>
                </button>
                <button
                    class="btn-default"
                    @click="handlerSaveNote"
                    title="Save"
                    :disabled="!redoList.length"
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
            :note="noteRef"
            @editNote="editNote"
        />
    </div>

    <PopupAddTodo
        ref="popupAddTodoRef"
        @add="addNewTodo"
        @edit="editTodo"
    />

    <PopupConfirm
        ref="popupConfirmRef"
        title="Cancel changes"
    >
        Are you sure you want to undo all changes?
    </PopupConfirm>
</template>

<style lang="less" scoped>
.btn-edit-page {
    margin-right: 5px;

    i {
        margin-right: 0;
    }
}
</style>