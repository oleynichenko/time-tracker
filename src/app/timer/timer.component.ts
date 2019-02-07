import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {TasksService} from '../tasks/tasks.service';
import {Task} from '../shared/task.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  taskId: number;
  task: Task;
  time = 0;
  timer: any;
  startBtnDisabled: boolean;
  pauseBtnDisabled: boolean;
  saveBtnDisabled: boolean;
  stopBtnDisabled: boolean;
  isTaskFinished: boolean;
  public modalRef: BsModalRef;

  @HostListener('window:beforeunload', ['$event']) saveTask() {
    this.onSave();
  }

  constructor(private route: ActivatedRoute,
              private tasksService: TasksService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.disableTimerBtns();
      this.tasksService.isRunningTaskInTimer.next(false);

      if (params.id) {
        this.taskId = +params.id;
        this.task = this.tasksService.getTask(this.taskId);
        this.time = this.task.time || 0;
        this.isTaskFinished = this.task.finished;

        if (!this.isTaskFinished) {
          this.startBtnDisabled = false;
          this.stopBtnDisabled = false;
          this.saveBtnDisabled = this.time === 0;
        }
      }
    });
  }

  disableTimerBtns() {
    this.startBtnDisabled = true;
    this.pauseBtnDisabled = true;
    this.saveBtnDisabled = true;
    this.stopBtnDisabled = true;
  }

  onStart() {
    if (this.time === 0) {
      this.time = 1;
      this.saveBtnDisabled = false;
    }

    this.timer = setInterval(() => {
      this.time += 1;
    }, 1000);

    this.startBtnDisabled = true;
    this.pauseBtnDisabled = false;
    this.tasksService.isRunningTaskInTimer.next(true);
  }

  onPause() {
    this.startBtnDisabled = false;
    this.pauseBtnDisabled = true;

    clearInterval(this.timer);
    this.tasksService.isRunningTaskInTimer.next(false);
  }

  onStop(modal) {
    console.log(modal);
    clearInterval(this.timer);
    this.startBtnDisabled = false;
    this.pauseBtnDisabled = true;
    this.tasksService.isRunningTaskInTimer.next(false);
    this.modalRef = this.modalService.show(modal);
  }

  onSave() {
    clearInterval(this.timer);
    this.startBtnDisabled = false;
    this.pauseBtnDisabled = true;
    this.tasksService.updateTaskTime(this.taskId, this.time);
    this.tasksService.isRunningTaskInTimer.next(false);
  }

  finishTask() {
    this.disableTimerBtns();
    this.tasksService.finishTask(this.taskId, this.time);
    this.isTaskFinished = true;
    this.modalRef.hide();
  }
}
