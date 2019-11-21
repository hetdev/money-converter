import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  accessKey = '63a3c4736713b53abdc2158595c6a16d';
  dataUrl = `http://data.fixer.io/api/latest?access_key=${this.accessKey}&format=1`;
  historicalUrl = 'http://data.fixer.io/api/';

  getConverterData() {
    return this.http.get(this.dataUrl);
  }

  getHistoricalData(date) {
    const completeUrl = `${this.historicalUrl}${date}?access_key=${this.accessKey}`
    return this.http.get(completeUrl);
  }

  constructor(private http: HttpClient) { }
}
