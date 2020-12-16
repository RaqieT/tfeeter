import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TfeetsComponent } from './tfeets/tfeets.component';
import { TfeetDetailComponent } from './tfeet-detail/tfeet-detail.component';
import { TfeetAddComponent } from './tfeet-add/tfeet-add.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'detail/:id', component: TfeetDetailComponent },
  { path: 'tfeets', component: TfeetsComponent },
  { path: 'add', component: TfeetAddComponent },
  { path: 'register', component: RegisterComponent }

];

function extractRoutes(): Routes {
  return null;
}

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
