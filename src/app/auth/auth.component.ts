import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Alertcomponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSubscribtion: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObservable: Observable<AuthResponseData>;
    const { email, password } = form.value;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.logIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.showAlert(errorMessage);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandleErrorClose() {
    this.error = null;
  }

  private showAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(Alertcomponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSubscribtion = componentRef.instance.close.subscribe(() => {
      this.closeSubscribtion.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    this.closeSubscribtion ? this.closeSubscribtion.unsubscribe() : null;
  }
}
