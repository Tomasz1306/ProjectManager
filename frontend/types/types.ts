export interface TaskType {
    id: string;
    status: string;
    name: string;
}

export interface BoardType {
    tasks: TaskType[];
    id: string;
    name: string;
}