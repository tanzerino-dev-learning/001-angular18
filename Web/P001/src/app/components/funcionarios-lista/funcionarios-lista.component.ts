import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-funcionarios-lista',
  templateUrl: './funcionarios-lista.component.html'
})
export class FuncionariosListaComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  filtros: any = {
    nome: '',
    cpf: '',
    email: ''
  };
  paginaAtual = 1;
  totalPaginas = 1;

  constructor(private funcionarioService: FuncionariosService) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const params = { ...this.filtros, page: this.paginaAtual, pageSize: 10 };
    this.funcionarioService.listar(params).subscribe(res => {
      this.funcionarios = res.dados;
      this.paginaAtual = res.paginaAtual;
      this.totalPaginas = res.totalPaginas;
    });
  }

  mudarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.buscar();
  }
}
