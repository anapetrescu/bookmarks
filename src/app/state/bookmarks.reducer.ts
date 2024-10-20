import { createReducer, on } from '@ngrx/store';
import {
  loadBookmarksSuccess,
  loadBookmarksFailure,
  addBookmarkSuccess,
  addBookmark,
  editBookmarkSuccess,
  setBookmarkToEdit,
  setSearchText,
} from './bookmarks.actions';
import { Bookmark } from '../models/bookmark';

export interface BookmarksState {
  bookmarks: Bookmark[];
  bookmarkToEdit: Bookmark | undefined;
  error: string | null;
  loading: boolean;
  searchText: string;
}

export const initialState: BookmarksState = {
  bookmarks: [],
  bookmarkToEdit: undefined,
  error: null,
  loading: true,
  searchText: '',
};

export const bookmarksReducer = createReducer(
  initialState,
  on(loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks: bookmarks,
    loading: false,
  })),
  on(loadBookmarksFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(addBookmark, (state) => ({
    ...state,
    loading: true,
  })),
  on(addBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    loading: false,
    bookmarks: [...state.bookmarks, bookmark],
  })),
  on(setBookmarkToEdit, (state, { bookmark }) => ({
    ...state,
    bookmarkToEdit: bookmark,
    loading: true,
  })),
  on(editBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    loading: false,
    bookmarkToEdit: undefined,
    bookmarks: state.bookmarks?.map((existingBookmark) =>
      existingBookmark.id === bookmark.id ? { ...bookmark } : existingBookmark
    ),
  })),
  on(setSearchText, (state, { searchText }) => ({
    ...state,
    searchText,
  }))
);
