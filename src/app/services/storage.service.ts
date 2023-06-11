import { Injectable } from '@angular/core';
import { ILocalUser } from '../models/local-user.model';
import { STORAGE_KEYS } from '../../config/storage-keys.config';

@Injectable()
export class StorageService {

  getLocalUser(): ILocalUser {
    let key = localStorage.getItem(STORAGE_KEYS.localUser);

    if(!key) {
      return null;
    }

    return JSON.parse(key);
  }

  setLocalUser(obj: ILocalUser) {
    if(!obj) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }
}
