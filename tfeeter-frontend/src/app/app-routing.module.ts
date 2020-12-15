import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TfeetsComponent } from './tfeets/tfeets.component';
import { TfeetDetailComponent } from './tfeet-detail/tfeet-detail.component';
import { TfeetAddComponent } from './tfeet-add/tfeet-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/tfeets', pathMatch: 'full' },
  { path: 'detail/:id', component: TfeetDetailComponent },
  { path: 'tfeets', component: TfeetsComponent },
  { path: 'add', component: TfeetAddComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
