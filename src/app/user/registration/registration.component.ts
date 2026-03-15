import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { FirstkeyPipe } from '../../shared/pipes/firstkey.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FirstkeyPipe ],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
    form: any;
    isSubmitted = false;

    //METHODE DE VALIDATION POUR LA CONFIRMATION DE MOT DE PASSE
   passwordMatchValidator : ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password && confirmPassword && password.value != confirmPassword.value) 
      confirmPassword.setErrors({ passwordMismatch: true });
     else 
      confirmPassword?.setErrors(null);

      return null;
    }

    constructor(
  public formBuilder: FormBuilder,
  private service : AuthService,
  private toastr : ToastrService) {
    this.form = this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required, 
          Validators.minLength(6),
          // Correction du pattern : il manquait un point avant l'étoile
          Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]], 
        confirmPassword: [''],
    }, { validators: this.passwordMatchValidator }); 
}

    onSubmit() {
      this.isSubmitted = true;
      if(this.form.valid){
        this.service.createUser(this.form.value)
        .subscribe({
          next: (res:any) => {
            if(res.succeeded){
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('New user  created !', 'Registration Succesful')
            }
            else 
            console.log('response:', res);
          },
          error: err => console.log('error', err)
        });
      }
    }

    hasDisplayableError(controlName: string): Boolean {
      const control = this.form.get(controlName);
      return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched)); 
    }

}

