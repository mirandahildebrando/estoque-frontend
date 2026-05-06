import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../auth.service'; 

@Component({
  selector: 'app-card-login',
  standalone: true,
  templateUrl: './card-login.html',
  styleUrls: ['./card-login.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class CardLogin {

  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3) // ajustei pra não travar seus usuários existentes
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const loginData = {
      username: this.loginForm.value.username?.trim(),
      password: this.loginForm.value.password?.trim()
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login bem-sucedido:', response);

        // ✅ CORREÇÃO AQUI
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro no login:', error);

        if (error.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else {
          this.errorMessage = 'Erro ao conectar com o servidor.';
        }
      }
    });
  }
}