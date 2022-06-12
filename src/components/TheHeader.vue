<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    title: string;
    showBtnBack?: boolean;
}>();
</script>

<template>
    <header>
        <button
            v-if="props.showBtnBack"
            class="btn-back btn-default"
            @click="router.back()"
        >
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h2>{{ props.title }}</h2>
        <div class="header__btn">
            <slot name="options"></slot>
        </div>
    </header>
</template>

<style lang="less" scoped>
header {
    padding: 20px 0;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        color: var(--green_color);
        flex-grow: 1;
        margin-left: 10px;
    }
}

.btn-back {
    border-radius: 50%;

    i {
        margin: 0px 2px;
    }
}

.header__btn {
    display: flex;
}
</style>