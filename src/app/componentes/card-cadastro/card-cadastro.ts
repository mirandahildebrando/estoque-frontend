// src/app/componentes/card-cadastro/card-cadastro.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../auth.service'; 

@Component({
  selector: 'app-card-cadastro',
  standalone: true,
  templateUrl: './card-cadastro.html',
  styleUrls: ['./card-cadastro.css'],
  imports: [ReactiveFormsModule]
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
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.cadastroForm.controls;
  }

  onSubmit() {
    console.log('BOTÃO CLICADO');

    if (this.cadastroForm.invalid) {
      console.log('FORM INVALIDO', this.cadastroForm.value);
      return;
    }

    const payload = {
      username: this.cadastroForm.value.username,
      password: this.cadastroForm.value.password
    };

    console.log('ENVIANDO:', payload);

    this.authService.cadastrar(payload).subscribe({
      next: (res) => {
        console.log('SUCESSO:', res);
        alert('Sucesso! Agora faça login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('ERRO BACKEND COMPLETO:', err);

        if (err.status === 400) {
          alert('Dados inválidos (verifique tamanho dos campos)');
        } else if (err.status === 409) {
          alert('Usuário já existe');
        } else if (err.status === 500) {
          alert('Erro no servidor');
        } else {
          alert('Erro ao cadastrar');
        }
      }
    });
  }
}