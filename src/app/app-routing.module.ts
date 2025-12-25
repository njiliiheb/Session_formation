import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public components
import { HomeComponent } from './public/home/home.component';
import { CategoriesComponent } from './public/categories/categories.component';
import { FormationListComponent as PublicFormationListComponent } from './public/formation-list/formation-list.component';
import { FormationDetailComponent } from './public/formation-detail/formation-detail.component';
import { SessionInscriptionComponent } from './public/session-inscription/session-inscription.component';

// Admin components
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormateurListComponent } from './admin/formateurs/formateur-list/formateur-list.component';
import { FormateurFormComponent } from './admin/formateurs/formateur-form/formateur-form.component';
import { FormationListComponent as AdminFormationListComponent } from './admin/formations/formation-list/formation-list.component';
import { FormationFormComponent } from './admin/formations/formation-form/formation-form.component';
import { SessionListComponent } from './admin/sessions/session-list/session-list.component';
import { SessionFormComponent } from './admin/sessions/session-form/session-form.component';
import { CandidatListComponent } from './admin/candidats/candidat-list/candidat-list.component';
import { CandidatFormComponent } from './admin/candidats/candidat-form/candidat-form.component';

const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'formations', component: PublicFormationListComponent },
  { path: 'formation/:id', component: FormationDetailComponent },
  { path: 'inscription/:id', component: SessionInscriptionComponent },

  // Admin routes
  {
    path: 'admin-space',
    children: [
      { path: '', component: DashboardComponent },
      
      // Formateurs routes
      { path: 'formateurs', component: FormateurListComponent },
      { path: 'formateurs/new', component: FormateurFormComponent },
      { path: 'formateurs/edit/:id', component: FormateurFormComponent },
      
      // Formations routes
      { path: 'formations', component: AdminFormationListComponent },
      { path: 'formations/new', component: FormationFormComponent },
      { path: 'formations/edit/:id', component: FormationFormComponent },
      
      // Sessions routes
      { path: 'sessions', component: SessionListComponent },
      { path: 'sessions/new', component: SessionFormComponent },
      { path: 'sessions/edit/:id', component: SessionFormComponent },
      
      // Candidats routes
      { path: 'candidats', component: CandidatListComponent },
      { path: 'candidats/new', component: CandidatFormComponent },
      { path: 'candidats/edit/:id', component: CandidatFormComponent }
    ]
  },

  // Redirect unknown routes to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
