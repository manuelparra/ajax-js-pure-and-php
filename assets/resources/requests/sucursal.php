<?php
    if (isset($_POST['flag_filtro']) && $_POST['flag_filtro']) {

        $querywhere = "WHERE estado.nombre = " . $_POST['text_filtro'];
    } else {
        $querywhere = "";
    }

    $conn = new mysqli("localhost", "manuel", "Guti.1712*", "farmacia");

    $sql = "
        SELECT sucursal.id, sucursal.nombre, sucursal.direccion, estado.nombre AS nombreestado
        FROM sucursal LEFT JOIN estado ON sucursal.id_estado = estado.id " .
        $querywhere . "
        ORDER BY estado.nombre ASC;";

    $query = $conn->query($sql);

    $i = 0;
    while ($rs = mysqli_fetch_array($query)) {
        $vector[$i]['id'] = $rs["id"];
        $vector[$i]['nombre'] = $rs["nombre"];
        $vector[$i]['estado'] = $rs["nombreestado"];
        $i++;
    }

    $conn->close();

    header("Type: application/json");
    echo json_encode($vector);
?>
