<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import type { ITodo } from '@/store/types';

const props = defineProps<{
    todoList: ITodo[];
}>();

</script>

<template>
    <ul class="todo-list">
        <TodoItem
            v-for="(todo) in props.todoList"
            :key="todo.id"
            :todo="todo"
        />
    </ul>
</template>

<style lang="less" scoped>
.todo-list {
    font-size: 20px;
}
</style>