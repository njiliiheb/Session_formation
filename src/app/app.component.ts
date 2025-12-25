import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion des Sessions de Formation';
  isAdminSpace = false;

  constructor(private router: Router) {
    // Détecter si on est dans l'espace admin
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminSpace = event.url.includes('/admin-space');
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin-space']);
  }

  navigateToCategories(): void {
    this.router.navigate(['/categories']);
  }

  navigateToFormations(): void {
    this.router.navigate(['/formations']);
  }
}
