import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto-service';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css']
})
export class ListaProdutos implements OnInit {

  produtos: any[] = [];

  produto = {
    id: null,
    nome: '',
    preco: 0
  };

  editando = false;

  constructor(private service: ProdutoService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
  this.service.listar().subscribe((res: any) => {
    this.produtos = res.data; 
  });
}

  salvarProduto() {
    if (this.editando) {
      // UPDATE (ajuste conforme sua API)
      this.service.atualizar(this.produto).subscribe(() => {
        this.listar();
        this.limpar();
      });
    } else {
      // CREATE
      this.service.criar(this.produto).subscribe(() => {
        this.listar();
        this.limpar();
      });
    }
  }

  editar(p: any) {
    this.produto = { ...p };
    this.editando = true;
  }

  deletar(id: number) {
    this.service.deletar(id).subscribe(() => {
      this.listar();
    });
  }

  limpar() {
    this.produto = { id: null, nome: '', preco: 0 };
    this.editando = false;
  }
}