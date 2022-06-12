<script setup lang="ts">
import { ref, useSlots } from 'vue';

defineExpose({ switchVisibility });

const props = defineProps<{
    title?: string;
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const slots = useSlots();
const showPopup = ref<boolean>(false);

function switchVisibility() {
    if (showPopup.value) emit('close');
    showPopup.value = !showPopup.value;
}
</script>

<template>
    <div
        class="popup-overlay"
        v-if="showPopup"
        @click="switchVisibility"
    ></div>
    <transition name="popup">
        <div
            v-if="showPopup"
            class="popup-modal"
        >
            <h2 v-if="!!props.title">{{ props.title }}</h2>
            <div class="popup-modal__content">
                <slot name="content"></slot>
            </div>
            <div
                class="popup-modal__footer"
                v-if="!!slots.footer"
            >
                <slot name="footer"></slot>
            </div>
        </div>
    </transition>
</template>

<style lang="less" scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.249);
}

.popup-modal {
    z-index: 10;
    --bg_color: #fff;
    @modal_width: 500px;
    position: fixed;
    width: @modal_width;
    top: 20%;
    left: calc(50% - @modal_width / 2);
    background-color: var(--bg_color);
    padding: 20px;

    &__content {
        position: relative;
    }

    h2 {
        margin-bottom: 20px;
    }
}

.popup-modal__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

//Transition popup
.popup-enter-from {
    transform: scale(0.2);
    opacity: 0;
}

.popup-enter-active {
    transition: all 0.3s cubic-bezier(.17, .67, .45, 1.36);
}

.popup-leave-active {
    transition: all 0.3s;
    opacity: 0;
    transform: scale(2);
}
</style>