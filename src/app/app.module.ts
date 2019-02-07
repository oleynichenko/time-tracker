import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TimerComponent } from './timer/timer.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskComponent } from './tasks/tasks-list/task/task.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TimePipe } from './shared/time.pipe';
import {RunningTaskGuardService} from './timer/running-task-guard.service';
import { CutStringPipe } from './shared/cut-string.pipe';

const routes: Routes = [
  {path: '', component: TimerComponent},
  {path: ':id', component: TimerComponent, canActivate: [RunningTaskGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TimerComponent,
    TasksListComponent,
    TaskComponent,
    NewTaskComponent,
    TimePipe,
    CutStringPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
