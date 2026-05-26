import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',

  standalone: true,

  imports: [CommonModule,FormsModule],

  templateUrl:
    './post-detail.component.html',

  styleUrls: [
    './post-detail.component.scss',
  ],
})
export class PostDetailComponent
  implements OnInit
{
  commentName = signal('');

  commentEmail = signal('');

  commentBody = signal('');

  private route =
    inject(ActivatedRoute);

  private postsService =
    inject(PostsService);

  private commentsService =
    inject(CommentsService);

  post = signal<any>(null);

  comments = signal<any[]>([]);

  loading = signal(false);

  ngOnInit(): void {

    this.loading.set(true);

    this.route.params
      .pipe(

        switchMap((params) =>

          this.postsService.getPostById(
            params['id'],
          ),
        ),
      )
      .subscribe({

        next: (response) => {

          this.post.set(response.data);

          this.loadComments(
            response.data._id,
          );

          this.loading.set(false);
        },

        error: (error) => {

          console.error(error);

          this.loading.set(false);
        },
      });
  }

  loadComments(postId: string) {

    this.commentsService
      .getCommentsByPost(postId)
      .subscribe({

        next: (response) => {

          this.comments.set(
            response.data,
          );
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  createComment() {

  if (!this.post()) return;

  const payload = {

    postId: this.post()._id,

    name: this.commentName(),

    email: this.commentEmail(),

    body: this.commentBody(),
  };

  this.commentsService
    .createComment(payload)
    .subscribe({

      next: (response) => {

        this.comments.update(
          (comments) => [

            response.data,

            ...comments,
          ],
        );

        this.commentName.set('');

        this.commentEmail.set('');

        this.commentBody.set('');
      },

      error: (error) => {
        console.error(error);
      },
    });
}
}