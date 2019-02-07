import { Injectable } from '@angular/core';
import {map, take} from 'rxjs/operators';

import {TasksService} from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class RunningTaskGuardService {

  constructor(private tasksService: TasksService) { }

  canActivate() {
    return this.tasksService.isRunningTaskInTimer.pipe(
      map((status) => !status),
      take(1)
    );
  }
}
