import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { switchMap } from 'rxjs';

import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],

  templateUrl:
    './post-form.component.html',

  styleUrls: [
    './post-form.component.scss',
  ],
})
export class PostFormComponent
  implements OnInit
{
  private fb = inject(FormBuilder);

  private postsService =
    inject(PostsService);

  private router =
    inject(Router);

  private route =
    inject(ActivatedRoute);

  loading = signal(false);

  isEditMode = signal(false);

  postId = '';

  form = this.fb.group({

    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ],
    ],

    body: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
      ],
    ],

    author: [
      '',
      Validators.required,
    ],
  });

  ngOnInit(): void {

    this.route.params.subscribe(
      (params) => {

        if (params['id']) {

          this.isEditMode.set(true);

          this.postId = params['id'];

          this.loadPost();
        }
      },
    );
  }

  loadPost() {

    this.loading.set(true);

    this.postsService
      .getPostById(this.postId)
      .subscribe({

        next: (response) => {

          this.form.patchValue(
            response.data,
          );

          this.loading.set(false);
        },

        error: (error) => {

          console.error(error);

          this.loading.set(false);
        },
      });
  }

  submit() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const payload = {

      title:
      this.form.value.title ?? '',

      body:
      this.form.value.body ?? '',

      author:
      this.form.value.author ?? '',
    };

    const request =
      this.isEditMode()

        ? this.postsService.updatePost(
            this.postId,
            payload,
          )

        : this.postsService.createPost(
            payload,
          );

    request.subscribe({

      next: () => {

        this.loading.set(false);

        this.router.navigateByUrl('/');
      },

      error: (error) => {

        console.error(error);

        this.loading.set(false);
      },
    });
  }
}