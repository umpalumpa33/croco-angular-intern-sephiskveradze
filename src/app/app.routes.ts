import { Routes } from '@angular/router';

import { Users } from './pages/users/users';
import { Posts } from './pages/posts/posts';
import { UserPosts } from './pages/user-posts/user-posts';
import { UserTodos } from './pages/user-todos/user-todos';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  { path: 'users', component: Users },

  { path: 'posts', component: Posts },

  { path: 'user-posts/:userId', component: UserPosts },

  { path: 'user-todos/:userId', component: UserTodos },

  { path: '**', redirectTo: 'users' },
];
