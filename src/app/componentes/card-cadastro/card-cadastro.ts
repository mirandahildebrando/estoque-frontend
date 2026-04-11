// src/app/componentes/card-cadastro/card-cadastro.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-card-cadastro',
  standalone: true,
  templateUrl: './card-cadastro.html',
  styleUrls: ['./card-cadastro.css'],
  imports: [ReactiveFormsModule] // Simplificado para o seu nível
})
export class CardCadastro {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.authService.cadastrar(this.cadastroForm.value).subscribe({
        next: () => {
          alert('Sucesso! Agora faça login.');
          this.router.navigate(['/login']);
        },
        error: () => alert('Erro ao cadastrar.')
      });
    }
  }
}