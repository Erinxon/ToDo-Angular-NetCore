import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup<{ email: FormControl<string>; password: FormControl<string>; }> = this.fb.nonNullable.group({
    email: ['', {
      validators: Validators.required
    }],
    password: ['', {
      validators: Validators.required
    }],
  });

  constructor(private readonly authService: AuthService, 
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder){
    
  }

  login(){
    if(this.form?.invalid){
      return;
    }
    const authModel: AuthModel = this.form.getRawValue();
    this.authService.login(authModel).subscribe({
      next: res => {
        this.authService.setUserAuth(res?.data);
        this.router.navigate(['/tasks']);
      },error: res => {
        this.toastrService.error(res?.error?.message);
      }
    })
  }
  
}