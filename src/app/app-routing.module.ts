import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';

const routes: Routes = [
  { path: 'company/all', component: CompanyListComponent },  // <-- new route
  { path: 'company/edit', component: CompanyEditComponent },
  { path: 'company/:id', component: CompanyEditComponent },
  { path: 'contact/all', component: ContactListComponent },
  { path: 'contact/:id', component: ContactEditComponent },
  { path: '**', redirectTo: 'company/all' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
