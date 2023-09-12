import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  set(key: string, value: any) {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.log(error)
    }
  }
  get(key: string) {
    try {
      const result = localStorage.getItem(key);
      return result;
    } catch (error) {
      console.log(error);
      return null; // O también puedes usar 'return undefined;'
    }
  }
}