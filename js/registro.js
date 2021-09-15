$(document).ready(function () {
	const inputsRegistro = document.querySelectorAll(
		"#formularioRegistro input"
	);
	const selectGeneroMusical = document.getElementById("generoMusical");
	const inputEdad = document.getElementsByName("edad");

	const formulario = document.getElementById("formularioRegistro");

	console.log("inputsInicioSesion", inputsRegistro);
	const expresiones = {
		onlyLetras: /^[a-zA-Z\_\-]{1,16}$/,
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{9,30}$/, // 7 a 30 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	};

	var campos = {
		email: false,
		contrasenia: false,
		generoMusical: false,
		edad: false,
		terminos: false,
	};

	function validarContrasenaIgual() {
		var pass1 = document.getElementById("contrasenia").value;
		var pass2 = document.getElementById("confirmacioncontrasenia").value;

		if (pass1 == pass2 && pass1 != "") {
			$("#confirmacioncontrasenia").removeClass("inputIncorrecto");
			$("#grupo_confirmacion_contrasenia  .mensajeError").addClass(
				"d-none"
			);
			campos["contrasenia"] = true;
		} else {
			$("#confirmacioncontrasenia").addClass("inputIncorrecto");
			$("#grupo_confirmacion_contrasenia  .mensajeError").removeClass(
				"d-none"
			);
			campos["contrasenia"] = false;
		}
	}

	function validarAceptacionTerminos() {
		const aceptoTerminos = document.getElementById("terminos");
		if (aceptoTerminos.checked) {
			$("#grupo_terminos_condiciones .mensajeError").addClass("d-none");
			campos["terminos"] = true;
		} else {
			$("#grupo_terminos_condiciones .mensajeError").removeClass(
				"d-none"
			);
			campos["terminos"] = false;
		}
	}

	function validarEdad() {
		if ($("input:radio[name=edad]:checked").length == 1) {
			$("#grupo_edad .mensajeError").addClass("d-none");
			campos["edad"] = true;
		} else {
			$("#grupo_edad .mensajeError").removeClass("d-none");
			campos["edad"] = false;
		}
	}

	function validarSelect() {
		console.log("entro al validar sleect");
		if (document.getElementById("generoMusical").value == -1) {
			$("#grupo_genero_musical .mensajeError").removeClass("d-none");
			$("#generoMusical").addClass("inputIncorrecto");
			campos["generoMusical"] = false;
		} else {
			$("#grupo_genero_musical .mensajeError").addClass("d-none");
			$("#generoMusical").removeClass("inputIncorrecto");
			campos["generoMusical"] = true;
		}
	}
	selectGeneroMusical.addEventListener("change", (event) => {
		validarSelect();
	});

	formulario.addEventListener("submit", (e) => {
		e.preventDefault();
		if (
			campos.email &&
			campos.contrasenia &&
			campos.generoMusical &&
			campos.edad &&
			campos.terminos
		) {
			swal(
				"Registro exitoso",
				"Usuario registrado correctamente",
				"success"
			);

			formulario.reset(); // Reiniciar campos del formulario
		} else {
			validarCampoFormulario(
				expresiones.correo,
				$("#email").val(),
				"email",
				"grupo_email"
			);
			validarCampoFormulario(
				expresiones.password,
				$("#contrasenia").val(),
				"contrasenia",
				"grupo_contrasenia"
			);
			validarContrasenaIgual();
			validarSelect();
			validarEdad();
			validarAceptacionTerminos();
			//falta validar edad
			console.log("form invalido", campos);
		}
	});

	function validarCampoFormulario(expresion, valor, campo, grupoCampo) {
		if (expresion.test(valor)) {
			$("#" + campo).removeClass("inputIncorrecto");
			$("#" + grupoCampo + " .mensajeError").addClass("d-none");
			campos[campo] = true;
		} else {
			$("#" + campo).addClass("inputIncorrecto");
			$("#" + grupoCampo + " .mensajeError").removeClass("d-none");
			campos[campo] = false;
		}
	}

	const validarInputFormulario = (e) => {
		switch (e.target.id) {
			case "email":
				validarCampoFormulario(
					expresiones.correo,
					$("#email").val(),
					"email",
					"grupo_email"
				);
				break;

			case "contrasenia":
				validarCampoFormulario(
					expresiones.password,
					$("#contrasenia").val(),
					"contrasenia",
					"grupo_contrasenia"
				);
				validarContrasenaIgual();
				break;
			case "confirmacioncontrasenia":
				validarContrasenaIgual();
				break;

			case "terminos":
				validarAceptacionTerminos();
				break;
		}
	};

	inputsRegistro.forEach((input) => {
		input.addEventListener("keyup", validarInputFormulario);
		input.addEventListener("blur", validarInputFormulario);
		input.addEventListener("click", validarInputFormulario);
	});

	inputEdad.forEach((input) => {
		input.addEventListener("change", validarEdad);
	});
});
