import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/core/models/auth.model';
import { GuestUser } from 'src/app/core/models/guestUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToDoService } from 'src/app/core/services/to-do.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  guestUser: GuestUser = {
    firstName: '',
    lastName: '',
    typeUser: 0,
    email: '',
    password: ''
  };

  constructor(public dialogRef: MatDialogRef<GuestComponent>,
    private auth: AuthService, private toastrService: ToastrService){
     
  }

  ngOnInit(): void {
    this.generateGuestUsers();
  }

  generateGuestUsers(){
    this.auth.generateGuestUsers().subscribe({
      next: res => {
        this.guestUser = res?.data;
      },error: res => {
        this.toastrService.error(res?.error?.message);
      }
    });
  }

  save(){
    this.auth.register({...this.guestUser}).subscribe({
      next: (response) => {
        const auth: AuthModel = {
          email: this.guestUser?.email ?? '',
          password: this.guestUser?.password ?? ''
        }
        this.dialogRef.close({success: true, auth: auth });
      },
      error: (error) => {
        this.toastrService.error(error?.error?.message);
      }
    })
  
  }

}