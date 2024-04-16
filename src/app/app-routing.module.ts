import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';

const routes: Routes = [
  { path: 'company/all', component: CompanyListComponent },  // <-- new route
  { path: 'company/edit', component: CompanyEditComponent },
  { path: 'company/:id', component: CompanyEditComponent },
  { path: '**', redirectTo: 'company/all' }                  // <-- redirect to the list now
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }