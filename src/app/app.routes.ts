import { Routes } from '@angular/router';
import { WindowComponent } from './window/window.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: ''
  // },
  {
    path: 'window',
    pathMatch: 'full',
    component: WindowComponent
  }
];
