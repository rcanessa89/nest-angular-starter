import { Routes, Route } from '@angular/router';

import { paths } from './paths';

const home: Route = {
  path: paths.home,
  loadChildren: '../features/home/home.module#HomeModule',
};

export const routes: Routes = [
  home,
];
