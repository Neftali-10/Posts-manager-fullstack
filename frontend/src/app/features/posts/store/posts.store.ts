import {
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

import { finalize } from 'rxjs';

import { Post } from '../models/post.model';

import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostsStore {

  private postsService =
    inject(PostsService);

  // STATE

  posts = signal<Post[]>([]);

  loading = signal(false);

  search = signal('');

  // COMPUTED

  filteredPosts = computed(() => {

    const term =
      this.search().toLowerCase();

    return this.posts().filter(
      (post) =>
        post.title
          .toLowerCase()
          .includes(term),
    );
  });

  // LOAD POSTS

  loadPosts() {

    this.loading.set(true);

    this.postsService
      .getPosts()
      .pipe(
        finalize(() =>
          this.loading.set(false),
        ),
      )
      .subscribe({
        next: (response) => {

          this.posts.set(
            response.data,
          );
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  // DELETE POST
  deletePost(id: string) {

  const confirmed = confirm(
    '¿Seguro que deseas eliminar este post?',
  );

  if (!confirmed) {
    return;
  }

  this.postsService
    .deletePost(id)
    .subscribe({

      next: () => {

        this.posts.update(
          (posts) =>

            posts.filter(
              (post) =>
                post._id !== id,
            ),
        );
      },

      error: (error) => {

        console.error(error);
      },
    });
}
 
}