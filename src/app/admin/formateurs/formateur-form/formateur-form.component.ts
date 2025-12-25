import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from '../../../services/formateur.service';
import { Formateur } from '../../../models/formateur';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formateur-form',
  templateUrl: './formateur-form.component.html',
  styleUrls: ['./formateur-form.component.scss']
})
export class FormateurFormComponent implements OnInit {
  formateurForm!: FormGroup;
  isEditMode = false;
  formateurId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private formateurService: FormateurService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formateurId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.formateurId && this.formateurId !== 'new';

    this.initForm();

    if (this.isEditMode && this.formateurId) {
      this.loadFormateur(this.formateurId);
    }
  }

  initForm(): void {
    this.formateurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      photo: ['https://via.placeholder.com/150', [Validators.required]],
      cv: ['https://example.com/cv.pdf', [Validators.required]],
      specialites: this.fb.array([this.fb.control('')])
    });
  }

  get specialites(): FormArray {
    return this.formateurForm.get('specialites') as FormArray;
  }

  addSpecialite(): void {
    this.specialites.push(this.fb.control(''));
  }

  removeSpecialite(index: number): void {
    if (this.specialites.length > 1) {
      this.specialites.removeAt(index);
    }
  }

  loadFormateur(id: string): void {
    const formateur = this.formateurService.getById(id);
    if (formateur) {
      this.specialites.clear();
      formateur.specialites.forEach(spec => {
        this.specialites.push(this.fb.control(spec));
      });

      this.formateurForm.patchValue({
        nom: formateur.nom,
        prenom: formateur.prenom,
        email: formateur.email,
        telephone: formateur.telephone,
        cin: formateur.cin,
        photo: formateur.photo,
        cv: formateur.cv
      });
    }
  }

  onSubmit(): void {
    if (this.formateurForm.valid) {
      const formateur: Formateur = {
        ...this.formateurForm.value,
        id: '',
        specialites: this.specialites.value.filter((s: string) => s.trim() !== '')
      };

      if (this.isEditMode && this.formateurId) {
        this.formateurService.update(this.formateurId, formateur);
        this.snackBar.open('Formateur modifié avec succès', 'Fermer', { duration: 3000 });
      } else {
        this.formateurService.create(formateur);
        this.snackBar.open('Formateur créé avec succès', 'Fermer', { duration: 3000 });
      }

      this.router.navigate(['/admin-space/formateurs']);
    }
  }

  cancel(): void {
    this.router.navigate(['/admin-space/formateurs']);
  }
}
