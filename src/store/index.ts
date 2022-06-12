import type { INote } from './types';
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { StorageKeys, storageSetItem } from '@/utils/localStorage';

export interface State {
    notes: INote[]
}

export const key: InjectionKey<Store<State>> = Symbol()

//Для typescript переопределяем ф-цию useStore, чтобы не импортировать в каждом комопоненте тип key
export function useStore() {
    return baseUseStore(key)
}

export default createStore<State>({
    strict: process.env.NODE_ENV !== 'production',

    state() {
        return {
            notes: []
        }
    },

    getters: {
        getNotes(state: State): INote[] {
            return state.notes;
        }
    },

    mutations: {
        saveNote(state: State, payload: INote) {
            if (Array.isArray(payload)) {
                state.notes = payload;
            } else {
                state.notes.unshift(payload);
                storageSetItem(StorageKeys.Notes, state.notes);
            }
        },
        editNote(state, payload: INote) {
            const noteIndex = state.notes.findIndex(n => n.id === payload.id);
            state.notes[noteIndex] = payload;
            storageSetItem(StorageKeys.Notes, state.notes);
        },
        deleteNote(state, id: string) {
            state.notes = state.notes.filter(note => note.id !== id);
            storageSetItem(StorageKeys.Notes, state.notes);
        }
    }
});