import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private token: string;

  constructor() {
    this.token = localStorage.getItem('userToken') || this.generateToken();
    localStorage.setItem('userToken', this.token);
  }

  getToken() {
    return this.token;
  }

  private generateToken() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
}
