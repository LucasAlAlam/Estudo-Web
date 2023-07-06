<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>
    <?php
        date_default_timezone_set("America/Sao_Paulo"); //Muda o padrão de UTC para o horário de SP
        echo "Hoje é dia ". date("d/M/Y") ; //d é minusculo para dia e maiúsculo para dia da semana
        echo "A hora é ". date("G:i:s T"); //O padrão é o horário UTC
    ?>
    </h1>
</body>
</html>