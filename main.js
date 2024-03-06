function capturaDeDados() {
    const modeloAviao = input_aviao.value;
    const qtdManutencoes = Number(input_qtd.value);
    const tempoParado = Number(input_tempo.value);

    return {
        modeloAviao,
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
    const gastoManutencao = qtdManutencoes * 250_000;
    const gastoParado = (tempoParado * 75_000) * qtdManutencoes;
    const gastoTotal = gastoManutencao + gastoParado;

    const economia = gastoTotal - (gastoTotal * 0.30);
    const economiaPercentual = (economia / gastoTotal) * 100;

    console.log(economia)

    return {
        gastoManutencao,
        gastoParado,
        gastoTotal,
        economia,
        economiaPercentual
    };
}

function exibirDados() {
    event.preventDefault();


    const { gastoManutencao, gastoParado, gastoTotal, economia, economiaPercentual } = calcularEconomia();

    const graficoEconomia = document.getElementById("economia");
    const graficoPrejuizo = document.getElementById("prejuizo");

    document.documentElement.style = `--tamanhoEconomia: ${economiaPercentual}%; --tamanhoPrejuizo: ${100 - economiaPercentual}%; --tamanho-fonte-grafico: 1em;`;
    graficoEconomia.style.animation = "graficoEconomia 2s linear";
    graficoPrejuizo.style.animation = "graficoPrejuizo 2s linear";



    const mensagem = document.getElementById("div_mensagem");

    mensagem.innerHTML = `Com nosso sistema de monitoramento, terá uma economia de até: <span class="tamanhoResult">${economiaPercentual}%</span>`

}