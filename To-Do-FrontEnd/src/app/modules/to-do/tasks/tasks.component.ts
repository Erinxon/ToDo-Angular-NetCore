import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/core/models/task.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToDoService } from 'src/app/core/services/to-do.service';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(public dialog: MatDialog, private router: Router, 
    private toDoService: ToDoService,
    private toastrService: ToastrService,
    private auth: AuthService){
   
  }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(){
    this.toDoService.getTasks(this.auth.getUser()?.userId).subscribe({
      next: res => {
       this.tasks = res?.data;
      }, error: res => {
        this.toastrService.error(res?.error?.message);
      }
    });
  }

  openTask(){
    this.dialog
    .open(TaskComponent)
    .afterClosed()
    .subscribe((result) => {
      
    });
  }
}