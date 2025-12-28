import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { StorageService } from './services/storage.service';
import { FormateurService } from './services/formateur.service';
import { FormationService } from './services/formation.service';
import { SessionService } from './services/session.service';
import { CandidatService } from './services/candidat.service';

// Public Components
import { HomeComponent } from './public/home/home.component';
import { CategoriesComponent } from './public/categories/categories.component';
import { FormationListComponent } from './public/formation-list/formation-list.component';
import { FormationDetailComponent } from './public/formation-detail/formation-detail.component';
import { SessionInscriptionComponent } from './public/session-inscription/session-inscription.component';
import { ProgrammeDetailModalComponent } from './public/programme-detail-modal/programme-detail-modal.component';

// Admin Components
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormateurListComponent } from './admin/formateurs/formateur-list/formateur-list.component';
import { FormateurFormComponent } from './admin/formateurs/formateur-form/formateur-form.component';
import { FormationListComponent as AdminFormationListComponent } from './admin/formations/formation-list/formation-list.component';
import { FormationFormComponent } from './admin/formations/formation-form/formation-form.component';
import { SessionListComponent } from './admin/sessions/session-list/session-list.component';
import { SessionFormComponent } from './admin/sessions/session-form/session-form.component';
import { CandidatListComponent } from './admin/candidats/candidat-list/candidat-list.component';
import { CandidatFormComponent } from './admin/candidats/candidat-form/candidat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    // Public
    HomeComponent,
    CategoriesComponent,
    FormationListComponent,
    FormationDetailComponent,
    SessionInscriptionComponent,
    ProgrammeDetailModalComponent,
    // Admin
    DashboardComponent,
    FormateurListComponent,
    FormateurFormComponent,
    AdminFormationListComponent,
    FormationFormComponent,
    SessionListComponent,
    SessionFormComponent,
    CandidatListComponent,
    CandidatFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [
    StorageService,
    FormateurService,
    FormationService,
    SessionService,
    CandidatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
