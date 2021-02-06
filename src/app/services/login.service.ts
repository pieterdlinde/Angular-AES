import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AESHelper } from '../helpers/aes.helper';
import { AESUser } from '../models/aes-user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseHttpAddress: string = 'http://localhost:5000/';

  constructor(private http: HttpClient, private aesHelper: AESHelper) {}

  basicLogin(user: AESUser): Observable<string> {
    return this.http.post<string>(
      this.baseHttpAddress + 'api/user/basic-login',
      user
    );
  }

  aesLogin(user: AESUser): Observable<string> {
    const aesKeyValue = this.aesHelper.aesKey();
    const encUser: AESUser = {
      userName: this.aesHelper.encrypt(user.userName),
      password: this.aesHelper.encrypt(user.password),
      aesKey: aesKeyValue,
    };

    return this.http.post<string>(
      this.baseHttpAddress + 'api/user/aes-login',
      encUser
    );
  }

  aesAdvancedLogin(user: AESUser): Observable<string> {
    const aesKeyValue = this.aesHelper.aesKey();
    const encJsonUser = this.aesHelper.encrypt(JSON.stringify(user));

    return this.http.post<string>(
      this.baseHttpAddress + 'api/user/aes-advanced-login',
      { data: encJsonUser, aesKey: aesKeyValue }
    );
  }
}
