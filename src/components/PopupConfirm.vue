<script setup lang="ts">
import PopupWrapper from '@/components/PopupWrapper.vue'
import { ref } from 'vue';

const props = defineProps<{
    title?: string;
}>()

defineExpose({ show });

const popupWrapper = ref();
let callbackConfirm: (() => void) | null = null;

function show(callback: () => void) {
    if (typeof callback === 'function') {
        callbackConfirm = callback
    }
    popupWrapper.value?.switchVisibility();
}

function handlerConfirm() {
    if (callbackConfirm) {
        callbackConfirm();
        callbackConfirm = null;
    }
    popupWrapper.value?.switchVisibility();
}

function handlerCancel() {
    if (callbackConfirm) {
        callbackConfirm = null;
    }
    popupWrapper.value?.switchVisibility();
}
</script>

<template>
    <PopupWrapper
        ref="popupWrapper"
        :title="props.title"
    >
        <template #content>
            <p>
                <slot></slot>
            </p>
        </template>
        <template #footer>
            <button
                class="btn-cancel btn-default"
                @click="handlerCancel"
            >Cancel</button>
            <button
                class="btn-default"
                @click="handlerConfirm"
            >Ok</button>
        </template>
    </PopupWrapper>
</template>

<style lang="less" scoped>
.btn-cancel {
    margin-right: 10px;
    background-color: rgb(170, 62, 62);
}
</style>