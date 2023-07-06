<?php
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        if ($_POST['fname'] && $_POST['lname']) {
            echo "Olá, <strong> $fname $lname </strong>";
        }
        else {
            echo "Dados insuficientes! <a href=\"javascript:history.go(-1)\">Vá para a página anterior</a";
        }
    ?>