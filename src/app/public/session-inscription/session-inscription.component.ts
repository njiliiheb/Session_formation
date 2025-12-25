import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Session, CandidatInscrit } from '../../models/session';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-session-inscription',
  templateUrl: './session-inscription.component.html',
  styleUrls: ['./session-inscription.component.scss']
})
export class SessionInscriptionComponent implements OnInit {
  inscriptionForm!: FormGroup;
  session: Session | undefined;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (sessionId) {
      this.session = this.sessionService.getById(sessionId);
      if (!this.session || this.sessionService.isSessionComplete(sessionId)) {
        this.router.navigate(['/']);
        return;
      }
    }

    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.inscriptionForm.valid && this.session) {
      this.isSubmitting = true;

      const candidat: CandidatInscrit = {
        nom: this.inscriptionForm.value.nom,
        prenom: this.inscriptionForm.value.prenom,
        email: this.inscriptionForm.value.email,
        dateInscription: new Date()
      };

      const success = this.sessionService.inscrireCandidat(this.session.id, candidat);

      if (success) {
        this.snackBar.open('Inscription réussie !', 'Fermer', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      } else {
        this.snackBar.open('Erreur: La session est complète ou vous êtes déjà inscrit.', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/formation', this.session?.formationId]);
  }
}
