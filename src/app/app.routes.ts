import { Routes } from '@angular/router';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';

export const routes: Routes = [
  {
    path: '',
    component: BookmarksListComponent,
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-bookmark/add-bookmark.component').then(
        (m) => m.AddBookmarkComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/edit-bookmark/edit-bookmark.component').then(
        (m) => m.EditBookmarkComponent
      ),
  },
  {
    path: '*',
    component: BookmarksListComponent,
  },
];
