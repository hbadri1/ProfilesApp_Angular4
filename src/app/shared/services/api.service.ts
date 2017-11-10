import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';

import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {

  constructor(private http: Http,
  private jwtService : JwtService) { }


  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    );
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any>{
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params})
    .map((res: Response) => res.json());
    //We need to add catch later to format errors
  }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }

    if(this.jwtService.getToken()){
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

}
