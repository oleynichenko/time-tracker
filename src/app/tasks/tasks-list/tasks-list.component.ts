import { Component, OnInit } from '@angular/core';
import {TasksService} from '../tasks.service';
import {Task} from '../../shared/task.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[];
  subscription: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;

    this.subscription = this.tasksService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      });
  }
}
