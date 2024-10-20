import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { Store } from '@ngrx/store';
import { loadBookmarks } from './state/bookmarks.actions';
import { CommonModule } from '@angular/common';
import { SearchBookmarksComponent } from './components/search-bookmarks/search-bookmarks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SearchBookmarksComponent,
    BookmarksListComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bookmarks';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadBookmarks());
  }
}
