import {Task} from './task.model';

export const mockTasks: Task[] = [
  new Task('Write new post to the blog about updating in Angular7 and publish it to FB', 160, false),
  new Task('Write time-tracker', 60, true),
  new Task('Pass the course "Angular Deep Dive" by Angular University', null, false),
  new Task('Repair brother`s phone', 2 * 60, false)
];
