import { Routes } from '@angular/router';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/applications', pathMatch: 'full' },
  { path: 'applications', component: ApplicationListComponent },
  { path: 'applications/new', component: ApplicationFormComponent },
  { path: 'applications/:id', component: ApplicationDetailsComponent },
  { path: 'applications/:id/edit', component: ApplicationFormComponent },
  { path: '**', redirectTo: '/applications' }
];
