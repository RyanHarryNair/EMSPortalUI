import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm !: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.email],
      Password: ['', Validators.required]
    });
    localStorage.removeItem("token"); // When login. removes the previous token
  }

  login() {
    if (this.loginForm.valid) {
      //console.log(this.loginForm.value)
      this.auth.loginUser(this.loginForm.value).subscribe({  
        next: (res) => {
          alert(res.Message) 
          localStorage.setItem('token', res.Token)                                              // Login Success, Store the token
          if (this.auth.getRoleId() === '1') {
            this.router.navigate(['employee/employee-detail',Number(this.auth.getUserId())])    // getUserId is string. change it to number
          }
          else {
            this.router.navigate(['employee'])
          }
        }
      })
    }
    else {
      alert(`Form is not valid!!!`)
    }
  }
}
