import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor(public dialog: MatDialog){

  }

  openTask(){
    this.dialog
    .open(TaskComponent)
    .afterClosed()
    .subscribe((result) => {
      
    });
  }
}