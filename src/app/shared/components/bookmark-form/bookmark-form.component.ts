import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UrlValidatorDirective } from '../../directives/url-validator.directive';
import { Bookmark } from '../../../models/bookmark';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UrlValidatorDirective],
  templateUrl: './bookmark-form.component.html',
  styleUrl: './bookmark-form.component.scss',
})
export class BookmarkFormComponent implements OnChanges {
  bookmarkForm: FormGroup;
  @Output() formSubmit = new EventEmitter<Partial<Bookmark>>();
  @Input() bookmark: Bookmark | undefined;
  @Input() buttonText = 'Submit';
  constructor(private fb: FormBuilder) {
    this.bookmarkForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    this.bookmarkForm = this.fb.group({
      name: [this.bookmark?.name || '', Validators.required],
      url: [this.bookmark?.url || '', Validators.required],
    });
  }
}
