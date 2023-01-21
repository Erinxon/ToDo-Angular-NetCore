import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AuthModel, RegisterModel } from '../models/auth.model';
import { AuthResponse, UserResponse } from '../models/user-response.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: UserResponse = this.getUser();
  private userAuth: BehaviorSubject<UserResponse> = new BehaviorSubject<UserResponse>(
    this.currentUser
  );

  constructor(private readonly http: HttpClient, 
    private router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly jwt: JwtHelperService) { }

  login(authModel: AuthModel){
    return this.http.post<ApiResponse<AuthResponse>>('/auth', authModel);
  }

  register(registerModel: RegisterModel){
    return this.http.post<ApiResponse<string>>('/auth/Create', registerModel);
  }

  isAutehticated(): Observable<boolean> {
    return this.userAuth.asObservable().pipe(map((user) => user != null));
  }

  setUserAuth(authResponse: AuthResponse): void {
    this.localStorageService.setItem('token', authResponse?.token);
    this.userAuth.next(this.getUser());
  }

  getUser(): UserResponse {
    const token = this.localStorageService.getItem('token');
    const user = this.jwt.decodeToken(token);
    return user;
  }

  getUserAuth(): Observable<UserResponse> {
    return this.userAuth.asObservable();
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.userAuth.next(null!);
    this.router.navigate(['auth','login']);
  }

}
