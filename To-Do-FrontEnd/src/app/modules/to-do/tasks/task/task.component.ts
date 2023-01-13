import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/core/models/task.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToDoService } from 'src/app/core/services/to-do.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  form: FormGroup<{ name: FormControl<string>; description: FormControl<string>; }> = this.fb.nonNullable.group({
    name: ['', {
      validators: Validators.required
    }],
    description: ['', {
      validators: Validators.required
    }],
  });

  constructor(public dialogRef: MatDialogRef<TaskComponent>,
    private fb: FormBuilder, private toDoService: ToDoService,
    private auth: AuthService, private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: { task: Task }){
      if(this.data?.task){
        this.form.patchValue({...this.data?.task});
      }
  }

  save(){
    if(this.form.invalid){
      return;
    }
    const task  = {
      ...this.form.getRawValue(),
      toDoId: this.data?.task?.toDoId ?? null,
      userId: this.auth.getUser()?.userId,
    }
    this.toDoService.postTask(task).subscribe({
      next: res => {
        this.toastrService.success(this.data?.task ? 'Tarea editada correctamente' : 'Tarea creada correctamente');
        this.dialogRef.close({success: true});
      },
      error: res => {
        this.toastrService.error(res?.error?.message);
      }
    })
  }

}