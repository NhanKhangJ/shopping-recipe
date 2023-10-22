import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){

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
      this.showErrorAlert(errorRes)
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(error){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

     const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      this.onHandleError();
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
