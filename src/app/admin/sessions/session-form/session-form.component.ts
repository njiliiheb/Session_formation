import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { FormationService } from '../../../services/formation.service';
import { FormateurService } from '../../../services/formateur.service';
import { Session } from '../../../models/session';
import { Formation } from '../../../models/formation';
import { Formateur } from '../../../models/formateur';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss']
})
export class SessionFormComponent implements OnInit {
  sessionForm!: FormGroup;
  isEditMode = false;
  sessionId: string | null = null;
  formations: Formation[] = [];
  formateurs: Formateur[] = [];

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private formationService: FormationService,
    private formateurService: FormateurService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.sessionId && this.sessionId !== 'new';

    this.formations = this.formationService.getAll();
    this.formateurs = this.formateurService.getAll();

    this.initForm();

    if (this.isEditMode && this.sessionId) {
      this.loadSession(this.sessionId);
    }
  }

  initForm(): void {
    this.sessionForm = this.fb.group({
      formationId: ['', Validators.required],
      formateurIds: [[], Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadSession(id: string): void {
    const session = this.sessionService.getById(id);
    if (session) {
      this.sessionForm.patchValue({
        formationId: session.formationId,
        formateurIds: session.formateurIds,
        dateDebut: new Date(session.dateDebut).toISOString().substring(0, 10),
        dateFin: new Date(session.dateFin).toISOString().substring(0, 10),
        description: session.description
      });
    }
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      const session: Session = {
        ...this.sessionForm.value,
        id: '',
        dateDebut: new Date(this.sessionForm.value.dateDebut),
        dateFin: new Date(this.sessionForm.value.dateFin),
        candidatsInscrits: [],
        maxInscrits: 15
      };

      if (this.isEditMode && this.sessionId) {
        const existingSession = this.sessionService.getById(this.sessionId);
        session.candidatsInscrits = existingSession?.candidatsInscrits || [];
        this.sessionService.update(this.sessionId, session);
        this.snackBar.open('Session modifiée avec succès', 'Fermer', { duration: 3000 });
      } else {
        this.sessionService.create(session);
        this.snackBar.open('Session créée avec succès', 'Fermer', { duration: 3000 });
      }

      this.router.navigate(['/admin-space/sessions']);
    }
  }

  cancel(): void {
    this.router.navigate(['/admin-space/sessions']);
  }
}
