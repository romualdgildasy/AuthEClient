import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
    form: any;

    constructor(public formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            fullName: [''],
            email: [''],
            password: [''],
            confirmPassword: ['']
        });
    }
}

