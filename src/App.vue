<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useStore } from '@/store';
import { storageGetItem, StorageKeys } from './utils/localStorage';

const store = useStore();

onMounted(() => {
  store.commit('saveNote', storageGetItem(StorageKeys.Notes));
})
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>
