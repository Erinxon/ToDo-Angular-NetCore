import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/core/models/Pagination.model';
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
  pagination: Pagination = {
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0
  };

  constructor(public dialog: MatDialog, private router: Router, 
    private toDoService: ToDoService,
    private toastrService: ToastrService,
    private auth: AuthService){
   
  }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(){
    this.toDoService.getTasks(this.auth.getUser()?.userId, this.pagination.page, this.pagination.size).subscribe({
      next: res => {
       this.tasks = res?.data;
       this.pagination = {
          page: res?.pagination.page,
          size: res?.pagination.size,
          total: res?.pagination.total,
          totalPages: Math.ceil(res?.pagination.total / this.pagination.size),
       }
      }, error: res => {
        this.toastrService.error(res?.error?.message);
      }
    });
  }

  openTask(task?: Task){
    this.dialog
    .open(TaskComponent, {
      data: { task }
    })
    .afterClosed()
    .subscribe((result: { success: boolean }) => {
        if(result?.success){
          this.getTasks();
        }
    });
  }

  previous(){
    this.pagination.page -= 1;
    this.getTasks();
  }

  next(){
    this.pagination.page += 1;
    this.getTasks();
  }

  deleteTask(task: Task){
    this.toDoService.delete(task.toDoId).subscribe({
      next: res => {
        this.toastrService.success('Tarea eliminada correctamente');
        this.getTasks();
      }, error: res => {
        this.toastrService.error(res?.error?.message);
      }
    })
  }

  markAsDone({...task}: Task){
    task.done = true;
    this.toDoService.postTask(task).subscribe({
      next: res => {
        this.toastrService.success('Tarea marcada como completada');
        this.getTasks();
      }, error: res => {
        this.toastrService.error(res?.error?.message);
      }
    })
  }

  onPaginateChange(pagination: Pagination){
    this.pagination = pagination;
    this.getTasks();
  }

}