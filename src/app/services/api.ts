import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api { 
  private apiURL = 'http://127.0.0.1:3000/api';

  constructor(private http: HttpClient) { } 
  
  /**
   * Creataes a new user and his transaction.
   * @param payload - The object with name, card_bin, etc.
   */
  createTransactionAndUser(payload: any): Observable<any> {
    // 3. El servicio solo arma la llamada y la retorna.
    // No "alerta" ni "resetea" formularios.
    return this.http.post(`${this.apiURL}/create-transaction-test/`, payload);
  }

  allFraudulentTransactions(page: number = 1, search: string = ''): Observable<any> {
    return this.http.get(`${this.apiURL}/all-fraudulent-transactions/?page=${page}&search=${search}`);
  }
}
