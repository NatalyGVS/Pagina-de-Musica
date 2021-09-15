"use strict";
var $local = {
	$tablaMusicas: $("#tablaMusicas"),
	tablaMusicas: "",
};
console.log("AAaaa");

$local.tablaMusicas = $local.$tablaMusicas.DataTable({
	/*	ajax: {
		url: "https://raw.githubusercontent.com/NatalyGVS/laboPersona/master/datosMusica.json",
		type: "GET",
		beforeSend: function (xhr) {},
		error: function (response) {
			console.log("response ERRORRRR  ", response);
		},
	},*/
	data: [],
	initComplete: function () {
		$local.$tablaMusicas.wrap("<div class='table-responsive'></div>");
		$local.$tablaMusicas.attr("style", "width: 100%;");
		$(window).resize();
		console.log("completeee");
	},
	columnDefs: [
		{
			targets: 1,
			className: "text-left",
		},
		{
			targets: 0,
			className: "text-left",
		},
	],
	columns: [
		{
			title: "reproducciones",
			data: "reproducciones",
			visible: false,
		},
		{
			title: "Nombre",
			render: function (data, type, row) {
				return (
					'<div class="d-inline-flex align-items-center fuente-text-table"><strong>  ' +
					row.nombre +
					"</strong></div>"
				);
			},
		},
		{
			title: "Canción",
			render: function (data, type, row) {
				return (
					"<audio  src='canciones/" +
					row.ruta +
					"' controls>   </audio>"
				);
			},
		},
	],
	paging: false,
	info: false,
	searching: false,
});

$local.$tablaMusicas.find("thead").on("keyup", "input", function () {
	$local.tablaMusicas
		.column($(this).parent().index() + ":visible")
		.search(this.value)
		.draw();
});

console.log("bbbb");

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
	var newCanciones = canciones
		.sort(function (a, b) {
			return a.reproducciones - b.reproducciones;
		})
		.reverse()
		.slice(0, 3);

	console.log("new", newCanciones);
	$local.tablaMusicas.clear().draw();
	$local.tablaMusicas.rows.add(newCanciones).draw();
	console.log("eeeee");
});

console.log("zzzzz");
