

// Validar las entradas del formulario antes de enviar datos

function validateForm() {

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("Ingrese su nombre");
        return false;
    }

    if (age == "") {
        alert("Ingrese su edad");
        return false;
    }

    else if (age < 1) {
        alert("La edad no debe ser cero ni menor que cero.")
        return false;
    }

    if (address == "") {
        alert("Ingrese su Dirección");
        return false;
    }

    if (email == "") {
        alert("Ingrese su correo Electrónico");
        return false;
    }
    else if (!email.includes("@")) {
        alert("Dirección de correo electrónico no válida");
        return false;
    }

    return true;
}

// función para mostrar datos del almacenamiento local

function showData() {
    var listausuarios;
    //verifica si el elemento listausuarios existe en el almacenamiento local. 
    if (localStorage.getItem("listausuarios") == null) {
        listausuarios = [];
    }
    // Si el elemento no existe, la función crea un nuevo array vacío. Si el elemento existe, la función lo recupera del almacenamiento local y lo convierte en un objeto JavaScript.
    else {
        listausuarios = JSON.parse(localStorage.getItem("listausuarios"));
    }

    // Esta variable se utilizará para almacenar la cadena HTML que contiene los datos de los usuarios.
    var html = "";


    listausuarios.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' +
            index +
            ')"class="btn btn-danger">eliminar</button><button onclick="updateData(' +
            index +
            ')" class="btn btn-warning m-2">editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML =
        html;
}

//Carga todos los datos del almacenamiento local cuando se carga el documento o la página
document.onload = showData();

//función para agregar datos al almacenamiento local

function AddData() {
    // si el formulario es valido
    if (validateForm() == true) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var listausuarios;
        if (localStorage.getItem("listausuarios") == null) {
            listausuarios = [];
        } else {
            listausuarios = JSON.parse(localStorage.getItem
                ("listausuarios"));
        }
        listausuarios.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("listausuarios", JSON.stringify
            (listausuarios));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";

    }
}

// función para eliminar datos del almacenamiento local
function deleteData(index) {
    var listausuarios;
    if (localStorage.getItem("listausuarios") == null) {
        listausuarios = [];
    } else {
        listausuarios = JSON.parse(localStorage.getItem
            ("listausuarios"));
    }

    listausuarios.splice(index, 1);
    localStorage.setItem("listausuarios", JSON.stringify
        (listausuarios));
    showData();
}

// función para actualizar/editar datos en el almacenamiento local
function updateData(index) {
    //El botón Enviar se ocultará y el botón Actualizar se mostrará para actualizar los datos en el almacenamiento local.
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var listausuarios;
    if (localStorage.getItem("listausuarios") == null) {
        listausuarios = [];
    } else {
        listausuarios = JSON.parse(localStorage.getItem
            ("listausuarios"));
    }
    document.getElementById("name").value = listausuarios[index].
    name;
    document.getElementById("age").value = listausuarios[index].
    age;
    document.getElementById("address").value = listausuarios [index].
    address;
    document.getElementById("email").value = listausuarios[index].
    email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            listausuarios[index].name = document.getElementById
                ("name").value;
            listausuarios[index].age = document.getElementById
                ("age").value;
            listausuarios[index].address = document.getElementById
                ("address").value;
            listausuarios[index].email = document.getElementById
                ("email").value;

            localStorage.setItem("listausuarios", JSON.stringify
                (listausuarios));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            //Update button will hide and Submit button will show 
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";


        }
    }
}

