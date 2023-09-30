import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Firstname: [''],
      Lastname: [''],
      Email: [''],
      Password: [''],
    })
  }
  signup() {
    console.log(this.signupForm.value)
  }

}
