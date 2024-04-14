import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSubject = new Subject<any>();
  search$ = this.searchSubject.asObservable();

  private search: any;

  setSearch(newSearch: any) {
    this.search = newSearch;
    this.searchSubject.next(newSearch);
  }

  getSearch() {
    return this.search;
  }
}
