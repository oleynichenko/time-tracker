import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Task} from '../../../shared/task.model';
import {TasksService} from '../../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;
  isEditMode = false;
  isTaskValid: boolean;
  editedTaskName: string;

  constructor(private tasksService: TasksService) { }

  isTaskDisabled$: Observable<boolean>;

  ngOnInit() {
    this.isTaskDisabled$ = this.tasksService.isRunningTaskInTimer;
  }

  updateTask() {
    this.isEditMode = false;
    this.tasksService.updateTaskName(this.index, this.editedTaskName);
  }

  cancelEditing() {
    this.isEditMode = false;
    this.editedTaskName = this.task.name;
  }

  private validateTask(value) {
    return value.trim() !== '';
  }

  startEditing() {
    this.isEditMode = true;
    this.editedTaskName = this.task.name;
    this.isTaskValid = this.validateTask(this.editedTaskName);
  }

  getUpdatedTask(value) {
    this.editedTaskName = value;
    this.isTaskValid = this.validateTask(this.editedTaskName);
  }
}
