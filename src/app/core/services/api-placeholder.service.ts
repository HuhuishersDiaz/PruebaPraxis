import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPosts } from '../models/posts.model';
@Injectable({
  providedIn: 'root'
})
export class ApiPlaceholderService {

  

    constructor(private httpClient: HttpClient) { }

    getPosts  (page : number , limitPost : number): Observable<IPosts[]>{

      return this.httpClient.get<IPosts[]>(`${environment.url.placeholder}/posts?_page=${page}&_limit=${limitPost}`);
    }

    savePosts  (item : IPosts){

      return this.httpClient.post(`${environment.url.placeholder}/posts`,item);
    }

    editPosts  (item : IPosts){

      return this.httpClient.put(`${environment.url.placeholder}/posts/${item.id}`,item);
    }

    deletePosts  (item : IPosts){
      return this.httpClient.delete(`${environment.url.placeholder}/posts/${item.id}`);
    }

}
