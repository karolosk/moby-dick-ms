import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  endpoint = 'http://localhost:3000/api/';
  httpOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private extractData(res: Response) {
    console.log(res.body)
    let body = res;
    return body || { };
  }

  getContainers(): Observable<any> {
    return this.http.get(this.endpoint + 'containers')
  }

  getImages(): Observable<any> {
    return this.http.get(this.endpoint + 'images')
  }


  addContainer(): Observable<any> {
    console.log("adding new container");
    return this.http.post<any>(this.endpoint + 'containers', {} ,this.httpOptions)
  }

  startContainer(short_id):Observable<any> {
    console.log("Starting container:" + short_id)
    return this.http.put(this.endpoint + 'containers/'+short_id+ '/start', {} ,this.httpOptions)
  }

  stopContainer(short_id):Observable<any> {
    console.log("Stopping container:" + short_id)
    return this.http.put(this.endpoint + 'containers/'+short_id+ '/stop', {} ,this.httpOptions)
  }

  removeContainer(short_id):Observable<any> {
    console.log("Removing container:" + short_id)
    return this.http.delete(this.endpoint + 'containers/'+short_id + '/remove')
  }

  addImage(uri, tag):Observable<any>{
    return this.http.post<any>(this.endpoint + 'images/build?' + 'uri='+uri + '&tag=' +tag, this.httpOptions)
    }

  removeImage(id):Observable<any>{
    return this.http.delete(this.endpoint + 'images/delete?' + 'tags='+id, this.httpOptions)
  }


}
