import { Component } from '@angular/core';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import {
  START_OF_TODAY,
  START_OF_YESTERDAY,
} from '../../shared/constants/constants';
import { Bookmark, BookmarksList } from '../../models/bookmark';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import {
  selectAllBookmarks,
  selectBookmarksLoading,
} from '../../state/bookmarks.selectors';
@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [
    CommonModule,
    BookmarkCardComponent,
    MatCardModule,
    SpinnerComponent,
    RouterModule,
    MatTooltipModule,
  ],
  templateUrl: './bookmarks-list.component.html',
  styleUrl: './bookmarks-list.component.scss',
})
export class BookmarksListComponent {
  public bookmarks: BookmarksList | undefined;
  public bookmarksList$: Observable<BookmarksList>;
  public bookmarksLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
    this.bookmarksLoading$ = this.store.select(selectBookmarksLoading).pipe(
      map((loading) => {
        return loading;
      })
    );
    this.bookmarksList$ = this.store.select(selectAllBookmarks).pipe(
      map((allBookmarks) => {
        if (!allBookmarks) {
          return { today: [], yesterday: [], older: [] };
        }
        const bookmarks: Bookmark[] = this.sortBookmarksByDate(allBookmarks);
        const bookmarksList: BookmarksList =
          this.prepareBookmarkList(bookmarks);
        this.bookmarks = bookmarksList;
        return bookmarksList;
      })
    );
  }

  isBookmarkListValid(bookmarks: BookmarksList) {
    return (
      bookmarks?.today.length ||
      bookmarks?.yesterday.length ||
      bookmarks?.older.length
    );
  }

  private sortBookmarksByDate(bookmarks: Bookmark[]): Bookmark[] {
    return [...bookmarks].sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  }

  private prepareBookmarkList(bookmarks: Bookmark[]): BookmarksList {
    const bookmarksList: BookmarksList = {
      today: [],
      yesterday: [],
      older: [],
    };

    const partitionBookmarks = (startTimestamp: number): Bookmark[] => {
      const index = bookmarks.findIndex(
        (bookmark) => new Date(bookmark.lastUpdated).getTime() < startTimestamp
      );
      if (index !== -1) {
        const sliced = bookmarks.slice(0, index);
        bookmarks = bookmarks.slice(index);
        return sliced;
      }
      const all = [...bookmarks];
      bookmarks = [];
      return all;
    };

    bookmarksList.today = partitionBookmarks(START_OF_TODAY);
    if (!bookmarks.length) return bookmarksList;

    bookmarksList.yesterday = partitionBookmarks(START_OF_YESTERDAY);
    if (!bookmarks.length) return bookmarksList;

    bookmarksList.older = [...bookmarks];

    return bookmarksList;
  }

  public goToAddBookmark(): void {
    this.router.navigate(['/add']);
  }
}
