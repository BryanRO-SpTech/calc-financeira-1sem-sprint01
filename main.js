function capturaDeDados() {
    const qtdManutencoes = Number(input_qtd.value);
    const tempoParado = Number(input_tempo.value);


    return {
        qtdManutencoes,
        tempoParado
    };
}

function calcularEconomia() {
    const { qtdManutencoes, tempoParado } = capturaDeDados();

    /*
      Calculando quanto foi gasto de manutenções durante o ano, 
      levando em conta o valor médio de manutenções em aeronaves e média de gasto por dia parado.
     */
    const gastoManutencao = qtdManutencoes * 100_000_000;
    const gastoParado = (tempoParado * 1_200_000) * qtdManutencoes;
    const gastoFuncionarios = (tempoParado * (8_000 * 5)); // Em uma manutenção de um motor, em média é necessário 5 engenheiros e em média ganam 8 mil.
    const gastoTotal = gastoManutencao + gastoParado + gastoFuncionarios;;

    const totalComEconomia = gastoTotal - (gastoTotal * 0.30);
    const economia = gastoTotal - totalComEconomia;
    const prejuizoPercentual = (totalComEconomia / gastoTotal) * 100;

    return {
        gastoManutencao,
        gastoParado,
        gastoFuncionarios,
        gastoTotal,
        totalComEconomia,
        prejuizoPercentual,
        economia
    };
}

function exibirDados() {
    event.preventDefault();


    const { gastoManutencao, gastoParado, gastoFuncionarios, gastoTotal, totalComEconomia, prejuizoPercentual, economia } = calcularEconomia();

    const graficoEconomia = document.getElementById("economia");
    const graficoPrejuizo = document.getElementById("prejuizo");

    document.documentElement.style = `--tamanhoEconomia: ${100 - prejuizoPercentual}%; --tamanhoPrejuizo: ${prejuizoPercentual}%; --tamanho-fonte-grafico: 1em;`;

    //Iniciar animação do gráfico.
    graficoEconomia.style.animation = "graficoEconomia 2s linear";
    graficoPrejuizo.style.animation = "graficoPrejuizo 2s linear";

    // Inserir valores em dinheiro dentro do grafico.
    graficoEconomia.innerHTML = `${economia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    graficoPrejuizo.innerHTML = `${totalComEconomia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;



    const mensagem = document.getElementById("div_mensagem");

    mensagem.innerHTML = `
    <p>Cerca de <span class="tamanhoResult">30%</span> dos problemas em motores de aeronaves se tratam de problemas relacionados a <span class="temperatura">temperatura.</span><br></p>
    

    <table>
    
    <tr>
        <th>Gastos com Manutenção</th>
        <td>${gastoManutencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    </tr>
    
    <tr>
        <th>Gastos por tempo parado</th>
        <td>${gastoParado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    </tr>
    
    <tr>
        <th>Gastos com funcionarios</th>
        <td>${gastoFuncionarios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    </tr>
    
    <tr>
        <th>Gastos totais sem monitoramento</th>
        <td>${gastoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        
    </tr>
    
        <tr>
            <th>Economia com monitoramento</th>
            <td>${economia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
        
        <tr>
            <th>Gasto total utilizando monitoramento</th>
            <td>${totalComEconomia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
    </table>

    <p class="mensagemEconomia">Sua ecônomia será: ${economia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

    <div class="contratar">
        <img id="seta" src="./public/seta-direita.png"/>
        <button id="contratar">Contratar!</button>
    </div>
    `;

}