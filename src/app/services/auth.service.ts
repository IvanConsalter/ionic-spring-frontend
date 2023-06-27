import { StorageService } from "./storage.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { environment } from "../environments/environment";
import { ILocalUser } from "../models/local-user.model";
import jwt from "jsonwebtoken";
import { CartService } from "./cart.service";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  authenticate(user: User) {
    return this.http.post(`${environment.baseUrl}/login`, user, {
      observe: "response",
      responseType: "text",
    });
  }

  refreshToken() {
    return this.http.post(
      `${environment.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: "response",
        responseType: "text",
      }
    );
  }

  sucessLogin(authorizationValue: string) {
    const token = authorizationValue.substring(7);
    const decodedToken = jwt.decode(token);

    const user: ILocalUser = {
      token: token,
      email: decodedToken.sub,
    };

    this.storageService.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
