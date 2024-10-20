import { Component, OnInit } from '@angular/core';
import { BookmarkFormComponent } from '../../shared/components/bookmark-form/bookmark-form.component';
import { Bookmark } from '../../models/bookmark';
import { Store } from '@ngrx/store';
import { selectBookmarkToEdit } from '../../state/bookmarks.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { editBookmark } from '../../state/bookmarks.actions';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [BookmarkFormComponent, CommonModule, SpinnerComponent],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.scss',
})
export class EditBookmarkComponent implements OnInit {
  bookmarkToEdit$: Observable<Bookmark | undefined>;
  bookmarkToEdit: Bookmark | undefined;
  constructor(private store: Store, private router: Router) {
    this.bookmarkToEdit$ = this.store.select(selectBookmarkToEdit);
  }

  ngOnInit(): void {
    this.bookmarkToEdit$.subscribe((bookmark) => {
      if (!bookmark) {
        this.goToDashboard();
      } else {
        this.bookmarkToEdit = bookmark;
      }
    });
  }

  editBookmark(bookmark: Partial<Bookmark>) {
    if (bookmark.name && bookmark.url && this.bookmarkToEdit) {
      const newBookmark: Bookmark = {
        name: bookmark.name,
        url: bookmark.url,
        id: this.bookmarkToEdit.id,
        lastUpdated: new Date(),
      };
      this.store.dispatch(editBookmark({ bookmark: newBookmark }));
    }
    this.goToDashboard();
  }

  goToDashboard() {
    this.router.navigate(['']);
  }
}
