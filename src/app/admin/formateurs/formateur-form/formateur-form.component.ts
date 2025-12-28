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
  selectedFileName: string = '';
  selectedFile: File | null = null;
  selectedPhotoFileName: string = '';
  selectedPhotoFile: File | null = null;
  selectedPhotoPreview: string = '';

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
      cv: [''],
      cvFileName: [''],
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
        cv: formateur.cv,
        cvFileName: formateur.cvFileName || ''
      });
      
      if (formateur.cvFileName) {
        this.selectedFileName = formateur.cvFileName;
      }
      
      if (formateur.photo && formateur.photo.startsWith('data:')) {
        this.selectedPhotoPreview = formateur.photo;
      }
    }
  }

  onSubmit(): void {
    if (this.formateurForm.valid) {
      const formateur: Formateur = {
        ...this.formateurForm.value,
        id: '',
        specialites: this.specialites.value.filter((s: string) => s.trim() !== '')
      };

      // Debug: vérifier les données du formateur avant sauvegarde
      console.log('Formateur à sauvegarder:', formateur);
      console.log('CV disponible:', !!formateur.cv);
      console.log('CV length:', formateur.cv?.length || 0);
      console.log('CV fileName:', formateur.cvFileName);

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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      
      // Convertir le fichier en base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.formateurForm.patchValue({
          cv: base64String,
          cvFileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.formateurForm.patchValue({
      cv: '',
      cvFileName: ''
    });
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Veuillez sélectionner un fichier image valide', 'Fermer', { duration: 3000 });
        return;
      }

      this.selectedPhotoFile = file;
      this.selectedPhotoFileName = file.name;
      
      // Convertir l'image en base64 et créer un aperçu
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.selectedPhotoPreview = base64String;
        this.formateurForm.patchValue({
          photo: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.selectedPhotoFile = null;
    this.selectedPhotoFileName = '';
    this.selectedPhotoPreview = '';
    this.formateurForm.patchValue({
      photo: 'https://via.placeholder.com/150'
    });
  }
}
