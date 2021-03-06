import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent,  } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  },
  // {
  //   path: 'create',
  //   component: UserCreateComponent
  // },
  // {
  //   path: 'update',
  //   component: UserUpdateComponent
  // },
  // {
  //   path: '',
  //   redirectTo: 'user',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class UsersRoutingModule {}
