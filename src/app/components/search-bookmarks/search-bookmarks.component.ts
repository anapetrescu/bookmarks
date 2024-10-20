import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import {
  selectAllBookmarks,
  selectSearchText,
} from '../../state/bookmarks.selectors';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../models/bookmark';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';

@Component({
  selector: 'app-search-bookmarks',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, BookmarkCardComponent],
  templateUrl: './search-bookmarks.component.html',
  styleUrl: './search-bookmarks.component.scss',
})
export class SearchBookmarksComponent implements OnInit {
  searchText$: Observable<string>;
  bookmarks$: Observable<Bookmark[]> | undefined;
  constructor(private store: Store) {
    this.searchText$ = this.store.select(selectSearchText);
  }

  ngOnInit(): void {
    this.bookmarks$ = this.searchText$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) => {
        return this.getBookmark(searchText).pipe(
          map((bookmarks) => {
            return bookmarks;
          })
        );
      })
    );
  }

  getBookmark(searchText: string): Observable<Bookmark[]> {
    return this.store.select(selectAllBookmarks).pipe(
      map((allBookmarks) => {
        return allBookmarks.filter(
          (bookmark) =>
            bookmark.name.toLowerCase().includes(searchText.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );
  }
}
