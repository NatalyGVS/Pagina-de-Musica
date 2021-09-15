$(document).ready(function () {
	const inputsInicioSesion = document.querySelectorAll(
		"#formularioLogin input"
	);
	const formulario = document.getElementById("formularioLogin");

	console.log("inputsInicioSesion", inputsInicioSesion);
	const expresiones = {
		password: /^.{9,30}$/, // 9 a 30 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	};

	var campos = {
		emailUser: false,
		passUser: false,
	};
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("valdiar", campos);
		if (campos.emailUser && campos.passUser) {
			swal("Bienvenido", "Usted ha iniciado sesión correctamente");
			formulario.reset(); // Reiniciar campos del formulario
		} else {
			validarCampoFormulario(
				expresiones.correo,
				$("#emailUser").val(),
				"emailUser"
			);
			validarCampoFormulario(
				expresiones.password,
				$("#passUser").val(),
				"passUser"
			);
			console.log("form invalido", campos);
		}
	});

	function validarCampoFormulario(expresion, valor, campo) {
		if (expresion.test(valor)) {
			$("#" + campo).removeClass("inputIncorrecto");
			$("#" + campo + " ~ .mensajeError").addClass("d-none");
			campos[campo] = true;
		} else {
			$("#" + campo).addClass("inputIncorrecto");
			$("#" + campo + " ~ .mensajeError").removeClass("d-none");
			campos[campo] = false;
		}
	}

	const validarInputFormulario = (e) => {
		// console.log("eeeee", e);
		// console.log("e.target.name", e.target.id);
		switch (e.target.id) {
			case "emailUser":
				validarCampoFormulario(
					expresiones.correo,
					$("#emailUser").val(),
					"emailUser"
				);
				break;

			case "passUser":
				validarCampoFormulario(
					expresiones.password,
					$("#passUser").val(),
					"passUser"
				);
				break;
		}
	};

	inputsInicioSesion.forEach((input) => {
		input.addEventListener("keyup", validarInputFormulario);
		input.addEventListener("blur", validarInputFormulario);
		input.addEventListener("click", validarInputFormulario);
	});
});
