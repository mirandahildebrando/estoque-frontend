import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto-service';
import { CommonModule } from '@angular/common'; // Import necessário para Standalone
import { FormsModule } from '@angular/forms';   // Import necessário para Standalone

@Component({
  selector: 'app-lista-produtos',
  standalone: true, // Verifique se o seu é standalone
  imports: [CommonModule, FormsModule], // Adicione isso aqui se der erro de ngModel
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css']
})
export class ListaProdutos implements OnInit {

  produtos: any[] = [];
  editando = false;

  produto = {
    id: null as number | null,
    name: '',
    price: 0,
    quantity: 0
  };

  constructor(private service: ProdutoService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe({
      next: (res: any) => {
        this.produtos = res.data;
      },
      error: (err) => console.error('Erro ao listar', err)
    });
  }

  salvarProduto() {
    if (this.editando) {
      this.service.atualizar(this.produto).subscribe({
        next: () => {
          this.listar();
          this.limpar();
        }
      });
    } else {
      this.service.criar(this.produto).subscribe({
        next: () => {
          this.listar();
          this.limpar();
        }
      });
    }
  }

  editar(p: any) {
    this.editando = true;
    this.produto = { id: p.id, name: p.name, price: p.price, quantity: p.quantity };
  }

  deletar(id: number) {
    if (confirm('Deseja excluir este produto?')) {
      // Ajustado para 'deletar' ou 'excluir' conforme seu service
      this.service.deletar(id).subscribe({
        next: () => this.listar()
      });
    }
  }

  limpar() {
    this.editando = false;
    this.produto = { id: null, name: '', price: 0, quantity: 0 };
  }
}