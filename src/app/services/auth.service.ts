import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { environment } from "../environments/environment";

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  )
  { }

  authenticate(user: User) {
    return this.http.post(`${environment.baseUrl}/login`, user, { observe: 'response', responseType: 'text' });
  }
}
