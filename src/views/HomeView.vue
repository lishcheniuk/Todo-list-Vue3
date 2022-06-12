<script setup lang="ts">
import { ref } from "vue";
import TheNote from "../components/TheNote.vue";
import TheHeader from '@/components/TheHeader.vue';
import { useStore } from '@/store'
import PopupConfirm from '@/components/PopupWrapper.vue'

const store = useStore();
const popupConfirmRef = ref<InstanceType<typeof PopupConfirm> | null>(null);
const noteId = ref<string>('')

function confirmDeleteNote(id: string) {
    popupConfirmRef.value?.switchVisibility();
    noteId.value = id;
}

function handlerDeleteNote() {
    store.commit('deleteNote', noteId.value);
    popupConfirmRef.value?.switchVisibility();
}
</script>

<template>
    <div class="home">
        <the-header title="Notes">
            <template #options>
                <router-link
                    to="/create"
                    class="btn-default"
                >
                    <i class="fa-solid fa-circle-plus"></i>
                    Create Note
                </router-link>
            </template>
        </the-header>
        <template v-if="store.getters.getNotes.length">
            <TheNote
                v-for="note in store.getters.getNotes"
                :key="note.id"
                :note="note"
                :todoList="note.todos"
                @delete="confirmDeleteNote"
            />
        </template>

        <p
            v-else
            class="alternative-text"
        >Your notes will be displayed here</p>

        <PopupConfirm
            ref="popupConfirmRef"
            title="Deleting a note"
        >
            <template #content>
                <p>Are you sure you want to delete the note?</p>
            </template>
            <template #footer>
                <button
                    class="btn-cancel btn-default"
                    @click="popupConfirmRef?.switchVisibility"
                >Cancel</button>
                <button
                    class="btn-default"
                    @click="handlerDeleteNote"
                >Ok</button>
            </template>
        </PopupConfirm>
    </div>
</template>

<style scoped lang="less">
.btn-cancel {
    margin-right: 10px;
    background-color: rgb(170, 62, 62);
}

.alternative-text {
    margin-top: 50px;
    text-align: center;
    font-size: 20px;
}
</style>