// Variável para armazenar o saldo total
let saldoTotal = 0;

// Objeto para armazenar os saldos por categoria
const saldosPorCategoria = {
    salario: 0,
    pix: 0,
    mesada: 0,
    'vale-alimentacao': 0,
    'plano-saude': 0,
    'vale-refeicao': 0,
    'vale-academia': 0,
    'vale-cultura': 0
};

// Função para adicionar saldo de acordo com a categoria selecionada
function adicionarSaldo() {
    // Capturar o valor inserido
    const valor = parseFloat(document.getElementById('valor').value) || 0;

    // Capturar o tipo de saldo selecionado
    const tipoSaldo = document.getElementById('tipo-saldo').value;

    // Verificar se o valor é válido
    if (valor > 0) {
        // Atualizar o saldo da categoria escolhida
        saldosPorCategoria[tipoSaldo] += valor;

        // Atualizar o saldo total
        saldoTotal += valor;

        // Atualizar o saldo total na interface
        document.getElementById('saldo-total').innerText = `Saldo: R$ ${saldoTotal.toFixed(2)}`;

        // Limpar o campo de entrada
        document.getElementById('valor').value = '';

        // Mensagem para confirmar adição de saldo
        alert(`Adicionado R$ ${valor.toFixed(2)} ao saldo de ${tipoSaldo.replace('-', ' ')}.`);
    } else {
        alert('Por favor, insira um valor válido.');
    }
}
