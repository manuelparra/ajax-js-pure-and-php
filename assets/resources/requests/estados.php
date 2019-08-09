<?php
    $conn = new mysqli("localhost", "manuel", "Guti.1712*", "farmacia");

    $sql = "
        SELECT estado.nombre
        FROM estado
        ORDER BY estado.nombre ASC
    ";

    $query = $conn->query($sql);

    $i = 0;
    while ($rs = mysqli_fetch_array($query)) {
        $vector[$i] = $rs["nombre"];
        $i = $i + 1;
    }

    $conn->close();

    header("Type: application/json");
    echo json_encode($vector);
?>
