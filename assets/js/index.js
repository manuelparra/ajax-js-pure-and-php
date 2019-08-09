var dirRequest = "assets/resources/requests/";

// Función ajax que ejecta callback con la función que procesa la respueta del
// del servidor con los estados donde hay sucursales de la farmacia
function callAjaxQueryEstado(url, params, callback) {
    var jsonHttp = new XMLHttpRequest();

    jsonHttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Paso a la función callback la respueta del servidor
                callback(JSON.parse(this.responseText));
            } else if (this.status === 404) {
                console.log("Error 404");
            }
        }
    }

    jsonHttp.open("POST", url, true);
    jsonHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    jsonHttp.send(params);
}

// Función ajax que ejecuta callback con la función que procesa la respuesta
// del servidor con las sucursales por estado
function callAjaxQuerySucursal(url, params, evento, callback) {
    var jsonHttp = new XMLHttpRequest();

    jsonHttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Paso el evento que genero la llamada a la función y la
                // respueta retoranda por el servidor
                callback(evento, JSON.parse(this.responseText));
            } else if (this.status === 404) {
                console.log("Error 404");
            }
        }
    }

    jsonHttp.open("POST", url, true);
    jsonHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    jsonHttp.send(params);
}

// Función ajax que ejecuta callback con la función que procesa la respuesta
// del servidor con el inventario por sucursal(es)
function callAjaxQueryInventario(url, params, callback) {
    var jsonHttp = new XMLHttpRequest();

    jsonHttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Ejecuta la función que fue pasada como callback con la
                // respuesta del servidor
                callback(JSON.parse(this.responseText));
            } else if (this.status === 404) {
                console.log("Error 404");
            }
        }
    }

    jsonHttp.open("POST", url, true);
    jsonHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    jsonHttp.send(params);
}

// Esta función procesa la respueta del servidor con los estados donde hay
// sucursales de la farmacia.
function loadDataEstados(arr) {
    let combobox_estados = document.getElementById('combobox_estado');

    combobox_estados.innerHTML = '<option value="Todos">TODOS</option>';

    for (let i = 0; i < arr.length; i++) {
        combobox_estados.innerHTML += '<option value=' + arr[i] + '>' + arr[i].toUpperCase() + '</option>';
    }
}

// Esta función procesa la respueta del servidor con las
function loadInfoSucursales(evento, arr) {
    let combobox_sucursal = document.getElementById('combobox_sucursal');

    if (arr != null) {
        if (arr.length > 1) {
            combobox_sucursal.innerHTML = '<option value="Todas">TODAS</option>';
        } else {
            combobox_sucursal.innerHTML = '';
        }
        for (let i = 0; i < arr.length; i++) {
            combobox_sucursal.innerHTML += '<option value="' + arr[i]["nombre"] + '">' + arr[i]["nombre"].toUpperCase() + '</option>';
        }
    } else {
        combobox_sucursal.innerHTML = '';
    }

    if (evento == 'change') {
        filtraInventarioPorSucursal();
    }
}

function LoadInfoInventario(arr) {
    let tbody_inventario = document.getElementById('data_inventario');

    if (arr != null) {
        tbody_inventario.innerHTML = '';

        for (let i = 0; i < arr.length; i++) {
            tbody_inventario.innerHTML += [
                '<tr>',
                    '<td>' + arr[i]['documento'] + '</td>',
                    '<td>' + arr[i]['codigo'] + '</td>',
                    '<td>' + arr[i]['medicamento'].toUpperCase() + '</td>',
                    '<td>' + arr[i]['existencia'] + '</td>',
                    '<td>' + arr[i]['sucursal'].toUpperCase() + '</td>',
                    '<td>' + arr[i]['estado'].toUpperCase() + '</td>',
                '</tr>'
            ].join('');
        }
    } else {
        tbody_inventario.innerHTML = '';
    }
}

function loadDataPage() {
    callAjaxQueryEstado(dirRequest + "estados.php", "", loadDataEstados);
    callAjaxQuerySucursal(dirRequest + "sucursal.php", "", "load", loadInfoSucursales);
    callAjaxQueryInventario(dirRequest + "inventario.php", "", LoadInfoInventario);
}

// Esta función valida el estado selección para filtrar los datos
function filtraSucursalPorEstado(e) {
    let params;

    if (this.value != 'Todos') {
        params = "flag_filtro=1&text_filtro='" + this.value + "'";
    } else {
        params = "flag_filtro=0&text_filtro=''";
    }

    // LLamada a la función para consultar la base de datos, paso una función
    // como parametro para ejectuarse como callback
    callAjaxQuerySucursal(dirRequest + "sucursal.php", params, e.type, loadInfoSucursales);
}

function filtraInventarioPorSucursal() {
    let params;
    let combobox_sucursal = document.getElementById('combobox_sucursal');

    if (combobox_sucursal.value != 'Todas') {
        params = "flag_filtro=1&campo=sucursal&text_filtro=" + combobox_sucursal.value;
    } else {
        let combobox_estado = document.getElementById('combobox_estado');

        if(combobox_estado.value != 'Todos') {
            params = "flag_filtro=1&campo=estado&text_filtro=" + combobox_estado.value;
        } else {
            params = "flag_filtro=0&campo=sucursal&text_filtro=''";
        }
    }

    callAjaxQueryInventario(dirRequest + "inventario.php", params, LoadInfoInventario);
}

// Esta función se ejecuta con el evento load de la ventana
function main() {
    // Cargo la información de las listas desplegables y creo la tabla
    // con la información del enventario por sucursal
    loadDataPage();

    // Cargo en las variables las dos listas desplegables de la interfaz para
    let combobox_estado = document.getElementById('combobox_estado');
    let combobox_sucursal = document.getElementById('combobox_sucursal');

    // Escucha el evento change de las listas desplegables para realizar los
    // query para la carga de la información en pantalla
    combobox_estado.addEventListener('change', filtraSucursalPorEstado);
    combobox_sucursal.addEventListener('change', filtraInventarioPorSucursal);
}

window.addEventListener('load', main);
