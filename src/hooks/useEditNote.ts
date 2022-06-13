import { provide, ref } from "vue";
import type PopupAddTodoVue from "@/components/PopupAddTodo.vue";
import { colors } from "@/CONSTS";
import type { INote, ITodo } from "@/store/types";

export interface IProvideEditTodo {
    editTodoWithPopup: (todo: ITodo) => void;
    switchTodo: (todo: ITodo) => void;
    removeTodo: (id: string) => void;
}

export function useEditNote() {
    const noteRef = ref<INote>({ id: Date.now().toString(), title: '', color: colors[0] });
    const todoList = ref<ITodo[]>([]);
    const popupAddTodoRef = ref<InstanceType<typeof PopupAddTodoVue> | null>(null);
    const undoList = ref<INote[]>([]);
    const redoList = ref<INote[]>([]);

    provide<boolean>('modeEdit', true)

    provide<IProvideEditTodo>('provideEditTodo', {
        editTodoWithPopup: addTodoWithPopup,
        switchTodo: editTodo,
        removeTodo
    });

    function editNote(note: INote) {
        pushToRedo();
        noteRef.value = note;
    }

    function addTodoWithPopup(todo: ITodo) {
        popupAddTodoRef.value?.show(todo);
    }

    function editTodo(todo: ITodo) {
        pushToRedo();
        const todoIndex = todoList.value.findIndex(t => t.id === todo.id);
        todoList.value[todoIndex] = todo;
    }

    function addNewTodo(newTodo: ITodo) {
        pushToRedo();
        todoList.value.unshift(newTodo);
    }

    function removeTodo(id: string) {
        pushToRedo();
        todoList.value = todoList.value.filter(todo => todo.id !== id)
    }

    function pushToRedo() {
        redoList.value.push({ ...noteRef.value, todos: todoList.value.concat() })
    }

    function handlerRedo() {
        if (redoList.value.length < 1) return;
        const { todos, ...noteOther } = redoList.value.pop() as INote;

        undoList.value.push({ ...noteRef.value, todos: todoList.value });
        todoList.value = todos as ITodo[];
        noteRef.value = noteOther;
    }

    function handlerUndo() {
        if (undoList.value.length < 1) return;
        const { todos, ...noteOther } = undoList.value.pop() as INote;

        redoList.value.push({ ...noteRef.value, todos: todoList.value });
        todoList.value = todos as ITodo[];
        noteRef.value = noteOther;
    }

    return { noteRef, todoList, undoList, redoList, handlerRedo, handlerUndo, popupAddTodoRef, editTodo, addNewTodo, editNote }
}