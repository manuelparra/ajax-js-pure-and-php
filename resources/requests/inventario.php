<?php
  function consultarInventarioPorEstadoSucursal() {
    if (isset($_POST['flag_filtro']) && $_POST['flag_filtro']) {
      if ($_POST['campo'] == 'estado') {
        $querywhere = "WHERE estado.nombre = '" . $_POST['text_filtro'] . "' ";
      } else {
        $querywhere = "WHERE sucursal.nombre = '" . $_POST['text_filtro'] . "' ";
      }
    } else {
      $querywhere = "";
    }
    query($querywhere);
  }

  function consultarInventarioPorEstadoSucursalMedicamento() {
    if (isset($_POST['flag_filtro']) && $_POST['flag_filtro']) {
      if ($_POST['campo'] == 'estado') {
        $querywhere = "WHERE estado.nombre = '" . $_POST['text_filtro'] . "' AND insumo.nombre LIKE '%" . $_POST['text_find'] . "%' ";
      } else {
        $querywhere = "WHERE sucursal.nombre = '" . $_POST['text_filtro'] . "' AND insumo.nombre LIKE '%" . $_POST['text_find'] . "%' ";
      }
    } else if ($_POST['opcion'] == 2) {
      $querywhere = "WHERE insumo.nombre LIKE '%" . $_POST['text_find'] . "%' ";
    } else {
      $querywhere = "";
    }

    query($querywhere);
  }

  function query($querywhere) {
    $conn = new mysqli("localhost", "manuel", "Guti.1712*", "farmacia");

    $sql = "
      SELECT sucursal_insumo.id AS documento, insumo.id AS codigo,
      insumo.nombre AS medicamente, sucursal_insumo.existencia,
      sucursal.nombre AS sucursal, estado.nombre AS estado
      FROM farmacia.insumo
        RIGHT JOIN farmacia.sucursal_insumo
        LEFT JOIN farmacia.sucursal
        LEFT JOIN farmacia.estado ON sucursal.id_estado = estado.id
        ON sucursal_insumo.idsucursal = sucursal.id
        ON insumo.id = sucursal_insumo.idinsumo " .
      $querywhere . "
      ORDER BY insumo.nombre ASC;
    ";

    $query = $conn->query($sql);

    $i = 0;
    while ($rs = mysqli_fetch_array($query)) {
      $vector[$i]['documento'] = $rs['documento'];
      $vector[$i]['codigo'] = $rs['codigo'];
      $vector[$i]['medicamento'] = $rs['medicamente'];
      $vector[$i]['existencia'] = $rs['existencia'];
      $vector[$i]['sucursal'] = $rs['sucursal'];
      $vector[$i]['estado'] = $rs['estado'];
      $i++;
    }

    $conn->close();

    header("Type: application/json");
    echo json_encode($vector);
  }

  if ($_POST['opcion'] == 1) {
    consultarInventarioPorEstadoSucursal();
  } else if ($_POST['opcion'] == 2) {
    consultarInventarioPorEstadoSucursalMedicamento();
  }
?>
