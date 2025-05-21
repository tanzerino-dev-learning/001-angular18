import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosListaComponent } from './components/funcionarios-lista/funcionarios-lista.component';

const routes: Routes = [
  { path: '', component: FuncionariosListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
