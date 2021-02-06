import { Component } from '@angular/core';
import { AESUser } from './models/aes-user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private user: AESUser = {
    userName: 'Pieter@email.com',
    password: 'ThisIsAPassword',
    aesKey: '',
  };

  constructor(private loginService: LoginService) {}

  basicLogin() {
    this.loginService.basicLogin(this.user).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  aesLogin() {
    this.loginService.aesLogin(this.user).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  aesAdvancedLogin() {
    this.loginService.aesAdvancedLogin(this.user).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
