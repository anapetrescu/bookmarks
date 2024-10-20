import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookmarkCardComponent } from '../bookmark-card/bookmark-card.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setSearchText } from '../../../state/bookmarks.actions';
import { selectSearchText } from '../../../state/bookmarks.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    BookmarkCardComponent,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}
  searchText = '';

  ngOnInit(): void {
    this.store
      .select(selectSearchText)
      .subscribe((searchText) => (this.searchText = searchText));
  }
  goToAddBookmark(): void {
    this.store.dispatch(setSearchText({ searchText: '' }));
    this.router.navigate(['/add']);
  }

  goToHomePage(): void {
    this.store.dispatch(setSearchText({ searchText: '' }));
    this.router.navigate(['']);
  }

  onSearchTextChanged() {
    this.store.dispatch(setSearchText({ searchText: this.searchText }));
  }
}
