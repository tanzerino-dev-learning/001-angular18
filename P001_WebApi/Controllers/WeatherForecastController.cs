using Microsoft.AspNetCore.Mvc;
using Model;
using System.Text.Json;

namespace P001_WebApi.Controllers
{
    //https://localhost:7185/funcionario

    [ApiController]
    [Route("[controller]")]
    public class FuncionarioController : ControllerBase
    {
        private readonly ILogger<FuncionarioController> _logger;

        public FuncionarioController(ILogger<FuncionarioController> logger)
        {
            _logger = logger;
        }

        private readonly string _jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "funcionarios_mock.json");

        [HttpGet()]
        public IActionResult Get(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? nome = null,
            [FromQuery] string? funcional = null,
            [FromQuery] string? cpf = null,
            [FromQuery] string? nacionalidade = null,
            [FromQuery] string? telefone = null,
            [FromQuery] string? email = null,
            [FromQuery] DateTime? dataNascimentoInicio = null,
            [FromQuery] DateTime? dataNascimentoFim = null
        )
        {
            var funcionarios = CarregarFuncionarios();

            // Aplicar filtros se fornecidos
            if (!string.IsNullOrWhiteSpace(nome))
                funcionarios = funcionarios.Where(f => f.Nome.Contains(nome, StringComparison.OrdinalIgnoreCase)).ToList();

            if (!string.IsNullOrWhiteSpace(funcional))
                funcionarios = funcionarios.Where(f => f.Funcional.Contains(funcional, StringComparison.OrdinalIgnoreCase)).ToList();

            if (!string.IsNullOrWhiteSpace(cpf))
                funcionarios = funcionarios.Where(f => f.Cpf.Contains(cpf, StringComparison.OrdinalIgnoreCase)).ToList();

            if (!string.IsNullOrWhiteSpace(nacionalidade))
                funcionarios = funcionarios.Where(f => f.Nacionalidade.Contains(nacionalidade, StringComparison.OrdinalIgnoreCase)).ToList();

            if (!string.IsNullOrWhiteSpace(telefone))
                funcionarios = funcionarios.Where(f => f.Telefone.Contains(telefone, StringComparison.OrdinalIgnoreCase)).ToList();

            if (!string.IsNullOrWhiteSpace(email))
                funcionarios = funcionarios.Where(f => f.Email.Contains(email, StringComparison.OrdinalIgnoreCase)).ToList();

            if (dataNascimentoInicio.HasValue)
                funcionarios = funcionarios.Where(f => f.DataNascimento >= dataNascimentoInicio.Value).ToList();

            if (dataNascimentoFim.HasValue)
                funcionarios = funcionarios.Where(f => f.DataNascimento <= dataNascimentoFim.Value).ToList();

            // Paginação
            var total = funcionarios.Count;
            //var totalPages = (int)Math.Ceiling((double)total / pageSize);
            var totalPages = Math.Max(1, (int)Math.Ceiling((double)total / pageSize));

            //if (page < 1 || page > totalPages)
            //    return BadRequest($"Página inválida. Total de páginas: {totalPages}");

            if (page < 1 || (total > 0 && page > totalPages))
            {
                return BadRequest($"Página inválida. Total de páginas: {totalPages}");
            }

            var resultadosPaginados = funcionarios
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var resposta = new
            {
                paginaAtual = page,
                totalPaginas = totalPages,
                totalRegistros = total,
                dados = resultadosPaginados
            };

            return Ok(resposta);

        }
        private List<Funcionario> CarregarFuncionarios()
        {
            if (!System.IO.File.Exists(_jsonPath))
                return new List<Funcionario>();

            var json = System.IO.File.ReadAllText(_jsonPath);
            return JsonSerializer.Deserialize<List<Funcionario>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new List<Funcionario>();
        }
    }

}
