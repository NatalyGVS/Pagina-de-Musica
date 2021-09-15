"use strict";
var listadoFiltrosCanciones;

$.ajax({
	url: "https://raw.githubusercontent.com/NatalyGVS/laboPersona/master/datosMusica.json",
	type: "GET",
	dataType: "json",
	cache: false,
	contentType: "application/x-www-form-urlencoded; charset=utf-8",
	error: function (response) {
		console.log("ERror", response);
	},
}).then(function (response) {
	console.log("responseee", response);

	var canciones = response.canciones;
	listadoFiltrosCanciones = canciones
		.sort(function (a, b) {
			return a.reproducciones - b.reproducciones;
		})
		.reverse();

	listadoFiltrosCanciones.forEach(function (element) {
		crearArticle(element.ruta, element.icono, element.nombre);
	});
});

function crearArticle(rutaCancion, iconoImagen, nombreCanciones) {
	var divGeneral = document.createElement("div");
	divGeneral.className = "  col-md-6 col-lg-4 col-12";

	var article = document.createElement("div");
	article.className = "card  bg-light m-2 ";

	var divCardBody = document.createElement("div");
	divCardBody.className = "card-body ";

	var titulo = document.createElement("h5");
	var texto = document.createTextNode(nombreCanciones);

	var img = document.createElement("img");
	img.src = "imagenes/icon_" + iconoImagen + ".svg";
	img.className = "img-thumbnail border-0";

	var audio = document.createElement("audio");
	audio.src = "canciones/" + rutaCancion;
	audio.controls = "controls";
	audio.className = "col-12";

	titulo.appendChild(texto);

	divCardBody.appendChild(titulo);
	divCardBody.appendChild(audio);

	article.appendChild(img);
	article.appendChild(divCardBody);

	divGeneral.appendChild(article);
	document.getElementById("contenedorCanciones").appendChild(divGeneral);
}

var filtro = document.getElementById("inputFiltro");

function actualizarContendorCanciones() {
	const filtro = document.getElementById("inputFiltro").value.toLowerCase();
	console.log("filtro", filtro);
	var listaFiltrada = listadoFiltrosCanciones.filter((element) => {
		return element.nombre.includes(filtro);
	});

	document.getElementById("contenedorCanciones").innerHTML = "";
	listaFiltrada.forEach(function (element) {
		crearArticle(element.ruta, element.icono, element.nombre);
	});
	console.log("listaFiltrada", listaFiltrada);
	if (listaFiltrada.length === 0) {
		document.getElementById("contenedorCanciones").innerHTML =
			"<div class='my-4'> Búsqueda sin resultados</div>";
	}
}

filtro.addEventListener("keyup", (event) => {
	actualizarContendorCanciones();
});
