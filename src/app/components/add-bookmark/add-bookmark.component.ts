import { Component } from '@angular/core';
import { BookmarkFormComponent } from '../../shared/components/bookmark-form/bookmark-form.component';
import { Bookmark } from '../../models/bookmark';
import { generateUUID } from '../../shared/util/generateUUID';
import { Store } from '@ngrx/store';
import { addBookmark } from '../../state/bookmarks.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [BookmarkFormComponent],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.scss',
})
export class AddBookmarkComponent {
  constructor(private store: Store, private router: Router) {}

  addBookmark(value: Partial<Bookmark>) {
    if (value.name && value.url) {
      const newBookmark: Bookmark = {
        name: value.name,
        url: value?.url,
        lastUpdated: new Date(),
        id: generateUUID(),
      };
      this.store.dispatch(addBookmark({ bookmark: newBookmark }));

      this.router.navigate(['']);
    }
  }
}
