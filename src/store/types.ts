export interface ITodo {
    id: string;
    isChecked: boolean;
    title: string;
}

export interface INote {
    id: string;
    title: string;
    color: string;
    todos?: ITodo[];
}