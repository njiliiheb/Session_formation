import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../../services/formation.service';
import { Formation, NiveauFormation } from '../../../models/formation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {
  formationForm!: FormGroup;
  isEditMode = false;
  formationId: string | null = null;
  niveaux = Object.values(NiveauFormation);

  constructor(
    private fb: FormBuilder,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.formationId && this.formationId !== 'new';

    this.initForm();

    if (this.isEditMode && this.formationId) {
      this.loadFormation(this.formationId);
    }
  }

  initForm(): void {
    this.formationForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      chargeHoraire: [0, [Validators.required, Validators.min(1)]],
      programmePdf: ['https://example.com/programme.pdf', [Validators.required]],
      niveau: [NiveauFormation.DEBUTANT, [Validators.required]],
      categories: this.fb.array([this.fb.control('')]),
      motsCles: this.fb.array([this.fb.control('')])
    });
  }

  get categories(): FormArray {
    return this.formationForm.get('categories') as FormArray;
  }

  get motsCles(): FormArray {
    return this.formationForm.get('motsCles') as FormArray;
  }

  addCategorie(): void {
    this.categories.push(this.fb.control(''));
  }

  removeCategorie(index: number): void {
    if (this.categories.length > 1) {
      this.categories.removeAt(index);
    }
  }

  addMotCle(): void {
    this.motsCles.push(this.fb.control(''));
  }

  removeMotCle(index: number): void {
    if (this.motsCles.length > 1) {
      this.motsCles.removeAt(index);
    }
  }

  loadFormation(id: string): void {
    const formation = this.formationService.getById(id);
    if (formation) {
      this.categories.clear();
      formation.categories.forEach(cat => {
        this.categories.push(this.fb.control(cat));
      });

      this.motsCles.clear();
      formation.motsCles.forEach(mc => {
        this.motsCles.push(this.fb.control(mc));
      });

      this.formationForm.patchValue({
        titre: formation.titre,
        description: formation.description,
        chargeHoraire: formation.chargeHoraire,
        programmePdf: formation.programmePdf,
        niveau: formation.niveau
      });
    }
  }

  onSubmit(): void {
    if (this.formationForm.valid) {
      const formation: Formation = {
        ...this.formationForm.value,
        id: '',
        categories: this.categories.value.filter((c: string) => c.trim() !== ''),
        motsCles: this.motsCles.value.filter((m: string) => m.trim() !== '')
      };

      if (this.isEditMode && this.formationId) {
        this.formationService.update(this.formationId, formation);
        this.snackBar.open('Formation modifiée avec succès', 'Fermer', { duration: 3000 });
      } else {
        this.formationService.create(formation);
        this.snackBar.open('Formation créée avec succès', 'Fermer', { duration: 3000 });
      }

      this.router.navigate(['/admin-space/formations']);
    }
  }

  cancel(): void {
    this.router.navigate(['/admin-space/formations']);
  }
}
