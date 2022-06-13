export enum StorageKeys {
    Notes = 'notes'
}

export function storageSetItem(key: StorageKeys, payload: unknown) {
    localStorage.setItem(key, JSON.stringify(payload))
}

export function storageGetItem<T>(key: StorageKeys) {
    try {
        const value = localStorage.getItem(key);
        if (!value) return [];
        return JSON.parse(value) as T;
    } catch (error) {
        return [];
    }
}