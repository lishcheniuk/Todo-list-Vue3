<script setup lang="ts">
import { computed, ref } from "vue";
import TheNote from "../components/TheNote.vue";
import TheHeader from '@/components/TheHeader.vue';
import { useStore } from '@/store'
import PopupConfirm from '@/components/PopupConfirm.vue'
import type { INote } from "@/store/types";

const store = useStore();
const popupConfirmRef = ref<InstanceType<typeof PopupConfirm> | null>(null);

//На главной отображаем максимум по 3 todo
const getNotes = computed(() => store.getters.getNotes.map(
    (note: INote) => ({ ...note, todos: note.todos?.slice(0, 3) })
))

function handlerDeleteNote(id: string) {
    popupConfirmRef.value?.show(() => {
        store.commit('deleteNote', id);
    })
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
        <template v-if="getNotes.length">
            <TheNote
                v-for="note in getNotes"
                :key="note.id"
                :note="note"
                :todoList="note.todos"
                @delete="handlerDeleteNote"
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
            Are you sure you want to delete the note?
        </PopupConfirm>
    </div>
</template>

<style scoped lang="less">
.alternative-text {
    margin-top: 50px;
    text-align: center;
    font-size: 20px;
    color: grey;
}
</style>