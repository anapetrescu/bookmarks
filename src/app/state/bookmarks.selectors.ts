import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.reducer';

export const selectBookmarksState =
  createFeatureSelector<BookmarksState>('bookmarks');

export const selectAllBookmarks = createSelector(
  selectBookmarksState,
  (state: BookmarksState) => state.bookmarks
);

export const selectBookmarksLoading = createSelector(
  selectBookmarksState,
  (state: BookmarksState) => state.loading
);

export const selectBookmarkToEdit = createSelector(
  selectBookmarksState,
  (state: BookmarksState) => state.bookmarkToEdit
);

export const selectSearchText = createSelector(
  selectBookmarksState,
  (state: BookmarksState) => state.searchText
);
