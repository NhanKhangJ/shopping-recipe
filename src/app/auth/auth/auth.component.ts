import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error;

  constructor(private authService: AuthService, private router: Router){

  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    
    const email = form.form.value.email;
    const password = form.form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObs = this.authService.login(email, password)
    } else {
      console.log('signup')
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    },
    errorRes =>{
      console.log(errorRes);
      this.error = errorRes;
      this.isLoading = false;
    });

    form.reset();
  }

}
