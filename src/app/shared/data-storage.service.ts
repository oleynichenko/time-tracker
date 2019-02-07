import { Injectable } from '@angular/core';
import {Task} from './task.model';
import {mockTasks} from './mock-tasks';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  private dataField = 'timerTasks';

  constructor() { }

  storeTasks(tasks: Task[]) {
    const tasksData = JSON.stringify(tasks);
    sessionStorage.setItem(this.dataField, tasksData);
  }

  getTasks() {
    const tasks = sessionStorage.getItem(this.dataField);
    return JSON.parse(tasks) || mockTasks;
  }
}
