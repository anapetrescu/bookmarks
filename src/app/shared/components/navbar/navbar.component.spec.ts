import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NavbarComponent } from './navbar.component';
import { setSearchText } from '../../../state/bookmarks.actions';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideMockStore({}),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page when goToHomePage is called', () => {
    component.goToHomePage();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should navigate to add bookmark page when goToAddBookmark is called', () => {
    component.goToAddBookmark();
    expect(router.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('should dispatch setSearchText action when search text changes', () => {
    const spyDispatch = spyOn(store, 'dispatch');
    const searchText = 'Angular testing';

    component.searchText = searchText;
    component.onSearchTextChanged();

    expect(spyDispatch).toHaveBeenCalledWith(setSearchText({ searchText }));
  });
});
