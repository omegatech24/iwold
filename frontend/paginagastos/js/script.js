// Elementos do DOM
const form = document.getElementById('gastosForm');
const resumoGastos = document.getElementById('resumoGastos');
const totalGastosElem = document.getElementById('totalGastos');
const categoriaSelect = document.getElementById('categoria');
const descricaoOutrosContainer = document.getElementById('descricaoOutrosContainer');
const descricaoOutrosInput = document.getElementById('descricaoOutros');

let gastos = [];  // Array para armazenar os gastos

// Mostrar o campo "Especifique a Categoria" se "Outros" for selecionado
categoriaSelect.addEventListener('change', function() {
    if (categoriaSelect.value === 'outros') {
        descricaoOutrosContainer.style.display = 'block';
    } else {
        descricaoOutrosContainer.style.display = 'none';
        descricaoOutrosInput.value = '';  // Limpar o campo de texto se não for "Outros"
    }
});

// Função para adicionar um gasto
function adicionarGasto(event) {
    event.preventDefault();

    // Pegando os valores dos inputs
    let categoria = categoriaSelect.value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    // Se a categoria for "outros", usar o valor digitado no campo de texto
    if (categoria === 'outros') {
        categoria = descricaoOutrosInput.value || 'Outros';  // Usa o valor digitado ou "Outros" como padrão
    }

    // Criando um objeto para o gasto
    const gasto = { categoria, descricao, valor, tipo };

    // Adicionando o gasto ao array
    gastos.push(gasto);

    // Atualizando o resumo dos gastos
    atualizarResumo();

    // Resetando o formulário
    form.reset();
    descricaoOutrosContainer.style.display = 'none';  // Ocultar o campo de texto após o reset
}

// Função para atualizar o resumo dos gastos
function atualizarResumo() {
    resumoGastos.innerHTML = '';  // Limpar o conteúdo anterior

    let total = 0;  // Variável para armazenar o total

    gastos.forEach(gasto => {
        // Criar um div para cada gasto
        const gastoDiv = document.createElement('div');
        gastoDiv.classList.add('gasto-item', gasto.tipo);
        gastoDiv.innerHTML = `
            <strong>${gasto.categoria}</strong>: ${gasto.descricao} - R$${gasto.valor.toFixed(2)} <em>(${gasto.tipo})</em>
        `;

        resumoGastos.appendChild(gastoDiv);

        // Somar ao total
        total += gasto.valor;
    });

    // Atualizar o total dos gastos no elemento <span id="totalGastos">
    totalGastosElem.innerText = total.toFixed(2);
}

// Adicionando o evento de submit ao formulário
form.addEventListener('submit', adicionarGasto);
