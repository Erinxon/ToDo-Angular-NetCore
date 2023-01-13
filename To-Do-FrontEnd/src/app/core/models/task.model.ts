export interface Task {
    toDoId: string;
    name: string;
    description: string;
    done?: boolean;
    userId: string;
    createDate?: Date;
    firstName?: string;
    lastName?: string;
}