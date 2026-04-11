import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../auth.service'; 

/**
 * Componente responsável pelo CARD DE LOGIN.
 * * Ajustado para conectar com o backend no Render.
 */
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

  /** * FormGroup que representa o formulário de login
   */
  loginForm!: FormGroup;

  /**
   * Mensagem de erro exibida no template
   */
  errorMessage: string = '';

  /**
   * Estado de carregamento para desativar o botão enquanto o backend responde
   */
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // Serviço injetado
    private router: Router            // Para navegar após o login
  ) {
    this.buildForm();
  }

  /**
   * Cria e configura o formulário
   */
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ]
    });
  }

  /**
   * Getter para facilitar o acesso aos campos no HTML
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Executado ao clicar no botão Entrar
   */
  onSubmit(): void {
    this.errorMessage = ''; // Limpa erros anteriores

    // Validação visual antes de enviar
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const loginData = this.loginForm.value;

    // Chamada real para o seu backend no Render
    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login bem-sucedido:', response);
        
        // Se o seu Java devolve um Token, salve-o aqui (ex: localStorage)
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        // Redireciona para a tela principal (estoque)
        this.router.navigate(['/lista-produtos']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro no login:', error);
        
        // Tratamento de erro amigável
        if (error.status === 403 || error.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else {
          this.errorMessage = 'O servidor demorou a responder. Tente novamente.';
        }
      }
    });
  }
}