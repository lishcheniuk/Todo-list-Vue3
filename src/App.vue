<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useStore } from '@/store';
import { storageGetItem, StorageKeys } from './utils/localStorage';
import type { INote } from './store/types';

const store = useStore();

onMounted(() => {
  store.commit('saveNote', storageGetItem<INote[]>(StorageKeys.Notes));
})
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>
