import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../models/bookmark';

export const loadBookmarks = createAction('[Bookmarks] Load Bookmarks');

export const loadBookmarksSuccess = createAction(
  '[Bookmarks] Load Bookmarks Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadBookmarksFailure = createAction(
  '[Bookmarks] Load Bookmarks Failure',
  props<{ error: string }>()
);

export const addBookmark = createAction(
  '[Bookmarks] Add Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const addBookmarkSuccess = createAction(
  '[Bookmarks] Add Bookmark Success',
  props<{ bookmark: Bookmark }>()
);
export const setBookmarkToEdit = createAction(
  '[Bookmarks] Set Edit Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const editBookmark = createAction(
  '[Bookmarks] Edit Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const editBookmarkSuccess = createAction(
  '[Bookmarks] Edit Bookmark Success',
  props<{ bookmark: Bookmark }>()
);

export const setSearchText = createAction(
  '[Bookmarks] Set Search Text',
  props<{ searchText: string }>()
);
