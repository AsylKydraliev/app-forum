import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'addPost', component: AddPostComponent},
  {path: 'post', component: PostComponent},
  {path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
