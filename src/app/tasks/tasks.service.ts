import {Injectable} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Task} from '../shared/task.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private tasksData: Task[];
  tasksChanged = new Subject<Task[]>();
  isRunningTaskInTimer = new BehaviorSubject<boolean>(false);

  constructor(private dataStorageService: DataStorageService) { }

  get tasks() {
    if (!this.tasksData) {
      this.tasksData = this.dataStorageService.getTasks();
    }

    return JSON.parse(JSON.stringify(this.tasksData));
  }

  getTask(id) {
    return this.tasks[id];
  }

  finishTask(id: number, time: number) {
    this.tasksData[id].finished = true;
    this.tasksData[id].time = time;
    this.tasksChanged.next(this.tasks);
    this.storeTasks();
  }

  updateTaskTime(id: number, time: number) {
    this.tasksData[id].time = time;
    this.tasksChanged.next(this.tasks);
    this.storeTasks();
  }

  updateTaskName(id: number, name: string) {
    this.tasksData[id].name = name;
    this.tasksChanged.next(this.tasks);
    this.storeTasks();
  }

  addTask(task) {
    this.tasksData.push(task);
    this.tasksChanged.next(this.tasks);
    this.storeTasks();
  }

  storeTasks() {
    this.dataStorageService.storeTasks(this.tasks);
  }
}
