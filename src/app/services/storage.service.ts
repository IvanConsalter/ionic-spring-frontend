import { Injectable } from "@angular/core";
import { ILocalUser } from "../models/local-user.model";
import { STORAGE_KEYS } from "../../config/storage-keys.config";
import { ICart } from "../models/cart.model";

@Injectable()
export class StorageService {
  getLocalUser(): ILocalUser {
    let key = localStorage.getItem(STORAGE_KEYS.localUser);

    if (!key) {
      return null;
    }

    return JSON.parse(key);
  }

  setLocalUser(obj: ILocalUser) {
    if (!obj) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart(): ICart {
    let str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str != null) {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

  setCart(cart: ICart) {
    if (cart != null) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } else {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
  }

}
