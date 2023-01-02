import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './tasks/task/task.component';


@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, 
    MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, MatDialogModule,
  ]
})
export class ToDoModule { }
