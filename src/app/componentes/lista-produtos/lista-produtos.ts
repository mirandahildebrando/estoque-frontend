import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto-service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.html'
})
export class ListaProdutos implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.listar().subscribe(dados => this.produtos = dados);
  }
}