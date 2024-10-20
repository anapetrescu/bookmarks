import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Bookmark } from '../../../models/bookmark';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  setBookmarkToEdit,
  setSearchText,
} from '../../../state/bookmarks.actions';

@Component({
  selector: 'app-bookmark-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, RouterModule],
  templateUrl: './bookmark-card.component.html',
  styleUrl: './bookmark-card.component.scss',
})
export class BookmarkCardComponent {
  @Input() bookmark: Bookmark | undefined;

  constructor(private router: Router, private store: Store) {}

  get areDetailsValid(): boolean {
    return (
      !!this.bookmark &&
      this.bookmark.name?.length > 0 &&
      this.bookmark.url?.length > 0
    );
  }

  edit() {
    if (this.bookmark) {
      this.store.dispatch(setSearchText({ searchText: '' }));
      this.store.dispatch(setBookmarkToEdit({ bookmark: this.bookmark }));
      this.router.navigate(['/edit']);
    }
  }
}
