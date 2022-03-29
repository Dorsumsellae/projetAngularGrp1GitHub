import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { LoggedComponent } from './components/logged/logged.component';
import { StartComponent } from './components/start/start.component';
import { SigninComponent } from './components/signin/signin.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'home',
    component: LoggedComponent,
    canActivate: [AngularFireAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
