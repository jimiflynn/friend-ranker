import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './stories.component';
import { AuthGuard } from '../core/auth/auth.guard';
const routes: Routes = [
  {
    path: 'stories', component: StoriesComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }
