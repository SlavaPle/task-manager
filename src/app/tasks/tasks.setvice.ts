import { NewTaskData } from "./task/task.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    private tasks =[
        {
          id: 't1',
          userId: 'u1',
          title: 'Task 1',
          dueDate: '2025-01-01',
          summary: 'Summary 1'
        },
    ];

    constructor() {
        const tasks = localStorage.getItem('tasks');
        
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
    }

    getUserTasks(userId: string) {
        return this.tasks.filter((task) => task.userId === userId);
    }

    addTask(taskData: NewTaskData, userId: string) {
        this.tasks.push({
            id: new Date().getTime().toString(), 
            userId: userId, 
            title: taskData.title, 
            dueDate: taskData.dueDate, 
            summary: taskData.summary
        });
        this.saveTasks();
    }

    removeTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
    }

    completeTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}