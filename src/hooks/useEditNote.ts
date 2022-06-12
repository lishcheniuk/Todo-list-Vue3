import type PopupAddTodoVue from "@/components/PopupAddTodo.vue";
import { colors } from "@/CONSTS";
import type { INote, ITodo } from "@/store/types";
import { provide, ref } from "vue";

export type EditType = 'checkbox' | 'title'

export interface IProvideEditTodo {
    editTodo: (id: string, type: EditType) => void;
    removeTodo: (id: string) => void;
}

export function useEditNote() {
    const noteRef = ref<INote>({ id: Date.now().toString(), title: '', color: colors[0] });
    const todoList = ref<ITodo[]>([]);
    const popupAddTodoRef = ref<InstanceType<typeof PopupAddTodoVue> | null>(null);

    provide<boolean>('modeEdit', true)

    provide<IProvideEditTodo>('provideEditTodo', {
        editTodo: showAddTodoPopup, removeTodo
    });

    function showAddTodoPopup(id: string, type?: EditType) {
        const todoIndex = todoList.value.findIndex(t => t.id === id);
        const todo = Object.assign({}, todoList.value[todoIndex]);

        if (type === 'checkbox') {
            todo.isChecked = !todo.isChecked;
            todoList.value[todoIndex] = todo;
            return;
        }
        popupAddTodoRef.value?.show(todo);
    }

    function editTodo(todo: ITodo) {
        const todoIndex = todoList.value.findIndex(t => t.id === todo.id);
        todoList.value[todoIndex] = todo;
    }

    function addNewTodo(newTodo: ITodo) {
        todoList.value.unshift(newTodo);
    }

    function removeTodo(id: string) {
        todoList.value = todoList.value.filter(todo => todo.id !== id)
    }

    return { noteRef, todoList, popupAddTodoRef, editTodo, addNewTodo }
}