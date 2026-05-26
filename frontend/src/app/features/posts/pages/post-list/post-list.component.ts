import {
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsStore } from '../../store/posts.store';

@Component({
  selector: 'app-posts-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],

  templateUrl:
    './post-list.component.html',

  styleUrls: [
    './post-list.component.css',
  ],
})
export class PostListComponent
  implements OnInit
{
  store = inject(PostsStore);

  ngOnInit(): void {
    this.store.loadPosts();
  }
}