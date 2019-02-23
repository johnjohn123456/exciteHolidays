import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  requestCash(money: any) {
    if(typeof money === 'string') {
      money = money.replace(/,/g, '');
    }
    money = parseInt(money);
    return this.http.post('https://us-central1-atm-backend-2cc1b.cloudfunctions.net/withdraw', {
      'amount': money
    });
  }
}
