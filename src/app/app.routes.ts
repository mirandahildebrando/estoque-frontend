import { Routes } from '@angular/router';
import { CardLogin } from './componentes/card-login/card-login';
import { CardCadastro } from './componentes/card-cadastro/card-cadastro';
import { ListaProdutos } from './componentes/lista-produtos/lista-produtos';

export const routes: Routes = [
  { path: '', component: CardLogin },
  { path: 'login', component: CardLogin },
  { path: 'cadastro', component: CardCadastro },
  { path: 'produtos', component: ListaProdutos },

  
  { path: '**', redirectTo: '' }
];