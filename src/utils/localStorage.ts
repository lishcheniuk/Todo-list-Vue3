import type { INote, ITodo } from "@/store/types";

export enum StorageKeys {
    Notes = 'notes'
}

export function storageSetItem(key: StorageKeys, payload: INote[] | ITodo) {
    localStorage.setItem(key, JSON.stringify(payload))
}

export function storageGetItem(key: StorageKeys) {
    const value = localStorage.getItem(key);
    if (!value) return [];
    try {
        return JSON.parse(value)
    } catch (error) {
        return [];
    }
}