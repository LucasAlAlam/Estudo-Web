<?php 
    $desafio = $_POST['desafio'];
    $valor = $_POST['numero'];    
    switch ($desafio) {
        case 'as':
            if ($valor) {
                echo "O número informado é $valor. O antecessor é ". $valor-1 ." e o sucessor é ". $valor+1;
            }
            else {
                echo "<script>
                alert(\"Informe um valor!\");
                window.history.back();
            </script>"; 
            }
            break;
        case 'random':
                echo "O número gerado foi ". mt_rand(1,100);
            break;
        case 'convert':
            if ($valor) {
                $url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial=\''.date("m-d-Y", strtotime("-7 days")).'\'&@dataFinalCotacao=\''.date("m-d-Y").'\'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoCompra,dataHoraCotacao';
                
                $conteudo = file_get_contents($url);

                var_dump($conteudo);
                

                /*$dados = json_decode(file_get_contents($url), true);
                echo file_get_contents($url);
                var_dump($dados);
                $cotacao = $dados["value"][0]["cotacaoCompra"];
                $padrao = numfmt_create("pt_BR", NumberFormatter::CURRENCY);
                echo numfmt_format_currency($padrao, $valor, "BRL") . " é equivalente a " . numfmt_format_currency($padrao, $valor/$cotacao, "USD");*/
            }else {
                echo "<script>
                alert(\"Informe um valor!\");
                window.history.back();
            </script>";
            }
            break;
        case 'analiser':
            if ($valor) {
                echo "O número informado é $valor. A parte inteira é ". (int)$valor ." e a parte flutuante é ". $valor-(int)$valor;
            }
            else {
                echo "<script>
                alert(\"Informe um valor!\");
                window.history.back();
            </script>"; 
            }
            break;       
        default:
            echo "<script>
                    alert(\"Selecione um desafio!\");
                    window.history.back();
                </script>";
            break;
    }
?>