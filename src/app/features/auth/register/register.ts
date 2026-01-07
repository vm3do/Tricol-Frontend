import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm: FormGroup;
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage.set('Les mots de passe ne correspondent pas');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.successMessage.set('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        this.registerForm.reset();
        this.loading.set(false);
      },
      error: (error) => {
        let message = 'Une erreur est survenue lors de l\'inscription.';

        if (error.status === 409) {
          message = error.error?.message || 'Cette adresse email est déjà utilisée';
        } else if (error.status === 400) {
          message = error.error?.message || 'Données invalides. Veuillez vérifier vos informations.';
        } else if (error.status === 500) {
          message = 'Erreur serveur. Veuillez réessayer plus tard.';
        } else if (error.status === 0) {
          message = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
        } else if (error.error?.message) {
          message = error.error.message;
        }

        this.errorMessage.set(message);
        this.loading.set(false);
      }
    });
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}


