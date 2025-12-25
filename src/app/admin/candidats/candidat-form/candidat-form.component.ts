import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from '../../../services/candidat.service';
import { Candidat } from '../../../models/candidat';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidat-form',
  templateUrl: './candidat-form.component.html',
  styleUrls: ['./candidat-form.component.scss']
})
export class CandidatFormComponent implements OnInit {
  candidatForm!: FormGroup;
  isEditMode = false;
  candidatId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.candidatId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.candidatId && this.candidatId !== 'new';

    this.initForm();

    if (this.isEditMode && this.candidatId) {
      this.loadCandidat(this.candidatId);
    }
  }

  initForm(): void {
    this.candidatForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required]],
      photo: ['https://via.placeholder.com/150', [Validators.required]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loadCandidat(id: string): void {
    const candidat = this.candidatService.getById(id);
    if (candidat) {
      this.candidatForm.patchValue(candidat);
    }
  }

  onSubmit(): void {
    if (this.candidatForm.valid) {
      const candidat: Candidat = {
        ...this.candidatForm.value,
        id: ''
      };

      if (this.isEditMode && this.candidatId) {
        this.candidatService.update(this.candidatId, candidat);
        this.snackBar.open('Candidat modifié avec succès', 'Fermer', { duration: 3000 });
      } else {
        this.candidatService.create(candidat);
        this.snackBar.open('Candidat créé avec succès', 'Fermer', { duration: 3000 });
      }

      this.router.navigate(['/admin-space/candidats']);
    }
  }

  cancel(): void {
    this.router.navigate(['/admin-space/candidats']);
  }
}
