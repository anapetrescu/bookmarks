import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark } from '../../models/bookmark';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  constructor(private http: HttpClient) {}

  readonly BOOKMARK_URL = 'api/bookmarks';

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.BOOKMARK_URL);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.BOOKMARK_URL, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<any> {
    return this.http.put(`${this.BOOKMARK_URL}/${bookmark.id}`, bookmark);
  }
}
