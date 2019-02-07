import {Component} from '@angular/core';

import {TasksService} from '../tasks.service';
import {Task} from '../../shared/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  isAddingMode = false;
  isNewTaskValid = false;
  newTaskName = '';

  constructor(private tasksService: TasksService) { }

  startAdding() {
    this.isAddingMode = true;
  }

  cancelAdding() {
    this.isAddingMode = false;
    this.newTaskName = '';
    this.isNewTaskValid = false;
  }

  getNewTask(value) {
    this.isNewTaskValid = value.trim() !== '';

    if (this.isNewTaskValid) {
      this.newTaskName = value;
    }
  }

  addTask() {
    this.tasksService.addTask(new Task(this.newTaskName));
    this.cancelAdding();
  }
}
