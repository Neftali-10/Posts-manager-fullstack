import { Routes } from '@angular/router';
import { PostListComponent } from './features/posts/pages/post-list/post-list.component';
import { Component } from '@angular/core';
import { PostDetailComponent } from './features/posts/pages/post-detail/post-detail.component';
import { PostFormComponent } from './features/posts/pages/post-form/post-form.component';

export const routes: Routes = [

    {path:'',component:PostListComponent},
    {path: 'posts/create',component:PostFormComponent,},
    {path: 'posts/edit/:id',component:PostFormComponent,},
    {path: 'posts/:id',component:PostDetailComponent,},
];


