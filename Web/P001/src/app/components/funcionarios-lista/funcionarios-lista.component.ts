import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/funcionario.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-funcionarios-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './funcionarios-lista.component.html'
})
export class FuncionariosListaComponent {
  funcionarios: Funcionario[] = [];
  filtros = {
    nome: '',
    cpf: '',
    email: '',
    funcional: '',
    telefone: '',
    dataNascimentoInicio: '',
    dataNascimentoFim: ''
  };
  paginaAtual = 1;
  totalPaginas = 1;

  constructor(private funcionarioService: FuncionariosService) {}

  ngOnInit(): void {
    console.log('Inicializando componente de listagem');
    this.buscar();
  }

  buscar(): void {
    const params = {
      ...this.filtros,
      page: this.paginaAtual,
      pageSize: 10
    };

    this.funcionarioService.listar(params).subscribe(res => {
      this.funcionarios = res.dados;
      this.totalPaginas = res.totalPaginas;
      this.paginaAtual = res.paginaAtual;
    });
  }

  mudarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.buscar();
  }
}
