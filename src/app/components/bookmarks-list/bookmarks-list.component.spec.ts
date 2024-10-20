import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookmarksListComponent } from './bookmarks-list.component';
import {
  selectAllBookmarks,
  selectBookmarksLoading,
} from '../../state/bookmarks.selectors';
import { Bookmark, BookmarksList } from '../../models/bookmark';

describe('BookmarksListComponent', () => {
  let component: BookmarksListComponent;
  let fixture: ComponentFixture<BookmarksListComponent>;
  let store: MockStore;
  let router: Router;

  const mockBookmarks: Bookmark[] = [
    {
      id: '1',
      name: 'Bookmark1',
      url: 'bookmark1.com',
      lastUpdated: new Date(),
    },
    {
      id: '2',
      name: 'Bookmark2',
      url: 'bookmark2.com',
      lastUpdated: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksListComponent],
      providers: [
        provideMockStore({
          initialState: {},
        }),
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarksListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    store.overrideSelector(selectAllBookmarks, mockBookmarks);
    store.overrideSelector(selectBookmarksLoading, false);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load bookmarks from the store', (done) => {
    component.bookmarksList$.subscribe((bookmarksList) => {
      expect(bookmarksList.today.length).toBe(2);
      done();
    });
  });

  it('should show loading state based on store', (done) => {
    component.bookmarksLoading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('should navigate to add bookmark when goToAddBookmark is called', () => {
    component.goToAddBookmark();
    expect(router.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('should sort bookmarks by date', () => {
    const unsortedBookmarks: Bookmark[] = [
      {
        id: '1',
        name: 'Older',
        url: 'older.com',
        lastUpdated: new Date('2023-01-01'),
      },
      {
        id: '2',
        name: 'Newer',
        url: 'newer.com',
        lastUpdated: new Date('2023-01-10'),
      },
    ];

    const sorted = component['sortBookmarksByDate'](unsortedBookmarks);
    expect(sorted[0].name).toBe('Newer');
    expect(sorted[1].name).toBe('Older');
  });

  it('should prepare bookmark list with today, yesterday, and older bookmarks', () => {
    const bookmarks: Bookmark[] = [
      { id: '1', name: 'Today', url: 'today.com', lastUpdated: new Date() },
      {
        id: '2',
        name: 'Yesterday',
        url: 'yesterday.com',
        lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        name: 'Older',
        url: 'older.com',
        lastUpdated: new Date('2024-01-01'),
      },
    ];

    const preparedList = component['prepareBookmarkList'](bookmarks);
    expect(preparedList.today.length).toBe(1);
    expect(preparedList.yesterday.length).toBe(1);
    expect(preparedList.older.length).toBe(1);
  });

  it('should return true if bookmark list is valid', () => {
    const validBookmarks: BookmarksList = {
      today: [
        { id: '1', name: 'Today', url: 'today.com', lastUpdated: new Date() },
      ],
      yesterday: [],
      older: [],
    };

    expect(component.isBookmarkListValid(validBookmarks)).toBeTruthy();
  });

  it('should return false if bookmark list is empty', () => {
    const emptyBookmarks: BookmarksList = {
      today: [],
      yesterday: [],
      older: [],
    };
    expect(component.isBookmarkListValid(emptyBookmarks)).toBeFalsy();
  });
});
