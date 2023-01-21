import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeUser } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    firstName: ['', {
      Validators: Validators.required
    }],
    lastName: ['', {
      validators: Validators.required
    }],
    email: ['', [Validators.required, Validators.email]],
    password: ['', {
      validators: Validators.required
    }],
    passwordConfirmation: ['', {
      validators: [Validators.required]
    }]
  }, { validators: this.notSameValidator() });

  constructor(private readonly fb: FormBuilder, 
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
    ) { 
  }

  register(){
    if(this.form.invalid){
      return;
    }
    const registerModel = {
      ...this.form.getRawValue(),
      typeUser: TypeUser.Registered
    };
    this.authService.register(registerModel).subscribe({
      next: (response) => {
        this.toastrService.success('User created successfully');
        this.router.navigate(['auth','login']);
      },
      error: (error) => {
        this.toastrService.error(error?.error?.message);
      }
    })
    
  }

  notSameValidator(): ValidationErrors | null {
    return (control: FormGroup) => {
      if(!control.get('password')?.valid || !control.get('passwordConfirmation')?.valid){
        return;
      }
      const password = control.get('password')?.value;
      const passwordConfirmation = control.get('passwordConfirmation')?.value;
      if(password !== passwordConfirmation){
        this.form.get('passwordConfirmation')?.setErrors({ notSame: true });
      }
    }
   
  }

}