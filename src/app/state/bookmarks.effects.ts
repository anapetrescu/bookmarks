import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookmarksService } from '../shared/services/bookmarks.service';
import {
  loadBookmarks,
  loadBookmarksSuccess,
  loadBookmarksFailure,
  addBookmark,
  addBookmarkSuccess,
  editBookmark,
  editBookmarkSuccess,
} from './bookmarks.actions';

@Injectable()
export class BookmarksEffects {
  constructor(
    private actions$: Actions,
    private bookmarksService: BookmarksService
  ) {}

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookmarks),
      mergeMap(() =>
        this.bookmarksService.getBookmarks().pipe(
          map((bookmarks) => loadBookmarksSuccess({ bookmarks })),
          catchError((error) =>
            of(loadBookmarksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBookmark),
      mergeMap((action) =>
        this.bookmarksService
          .addBookmark(action.bookmark)
          .pipe(map(() => addBookmarkSuccess({ bookmark: action.bookmark })))
      )
    )
  );

  editBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBookmark),
      mergeMap((action) =>
        this.bookmarksService
          .updateBookmark(action.bookmark)
          .pipe(map(() => editBookmarkSuccess({ bookmark: action.bookmark })))
      )
    )
  );
}
