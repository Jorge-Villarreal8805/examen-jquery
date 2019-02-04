function editarNota(codigo){
	var Estudiante;
	for(var i = 0; i < localStorage.length; i++){
		var clave = localStorage.key(i);
		if(clave == codigo){
			estudiante = $.parseJSON(localStorage.getItem(clave));

			$("#codigo").val(estudiante.codigo);
			$("#nombre").val(estudiante.nombre);
			$("#apellido").val(estudiante.apellido);
			$("#nota").val(estudiante.nota);
		}
	}
}

function listarNotas(){
	var tabla = "";
	var parrafo1 = $("#p1");

	tabla += '<table border="1">';
	tabla += '<tr id="encabezado">';
	tabla += '<th>CODIGO</th>';
	tabla += '<th>NOMBRE</th>';
	tabla += '<th>APELLIDO</th>';
	tabla += '<th>NOTA</th>';
	tabla += '<th>EDITAR</th>';
	tabla += '<th>ELIMINAR</th>';
	tabla += '</tr>';

	for(var i = 0; i < localStorage.length; i++){
		var clave = localStorage.key(i);
		var estudiante = $.parseJSON(localStorage.getItem(clave));

		tabla += '<tr id="content">';
		tabla += '<td>' +estudiante.codigo+ '</td>';
		tabla += '<td>' +estudiante.nombre+ '</td>';
		tabla += '<td>' +estudiante.apellido+ '</td>';
		tabla += '<td>' +estudiante.nota+ '</td>';
		tabla += '<td><button id="editar" onclick="editarNota(\''+estudiante.codigo+'\');">Editar</button></td>';
		tabla += '<td><button id="eliminar" onclick="eliminarNota(\''+estudiante.codigo+'\');">Eliminar</button></td>';
		tabla += '</tr>';
	}

	tabla += '</table>';
	$(parrafo1).html(tabla);
}

function eliminarNota(codigo){
	localStorage.removeItem(codigo);
	listarNotas();
}

$("#notaMayor").click(function(){

	var mayor = 0;
	var nom = "";
	var apel = "";
	var code = "";

		for(var i = 0; i < localStorage.length; i++){
			codigo = localStorage.key(i);
			var estudiante = $.parseJSON(localStorage.getItem(codigo));
			var nota = parseFloat(estudiante.nota);

			if(nota > mayor){
		mayor = nota;
		nom = estudiante.nombre;
		apel = estudiante.apellido;
		code = estudiante.codigo;
		}
	};
	alert("La nota Mayor es de " + mayor + " y pertenece al Estudiate: " + nom + " " + apel + " con codigo # " + code);
});

$("#notaMenor").click(function(){
	var menor = 100;
	var nom = "";
	var apel = "";
	var code = "";

	for(var i = 0; i < localStorage.length; i++){
			codigo = localStorage.key(i);
			var estudiante = $.parseJSON(localStorage.getItem(codigo));
			var nota = parseFloat(estudiante.nota);

			if(nota < menor){
		menor = nota;
		nom = estudiante.nombre;
		apel = estudiante.apellido;
		code = estudiante.codigo;
		}
};
alert("La nota Menor es de: " + menor + " y pertenece al Estudiate: " + nom + " " + apel + " con codigo # " + code);
});

$("#promedio").click(function(){
	var promedio = "";
	var sumatoria = 0;

	for(var i = 0; i < localStorage.length; i++){
		var codigo = localStorage.key(i);
		var estudiante = $.parseJSON(localStorage.getItem(codigo));
		var nota = parseFloat(estudiante.nota);
		sumatoria = parseFloat(sumatoria) + parseFloat(nota);

	}
	promedio = parseFloat(sumatoria) / parseFloat(localStorage.length);

	alert("El promedio de todas las notas es " + promedio);
});

$(document).ready(function(){
	var contador;
	if(localStorage.length > 0){
		contador = localStorage.length + 1;
	}else{
		contador = 1;
	}

	$("#codigo").val(contador);

	$("#Reg_Estudiante").click(function(){
		var codigo = $("#codigo").val();
		var nombre = $("#nombre").val();
		var apellido = $("#apellido").val();
		var nota = parseFloat($("#nota").val());

		if(nombre == "" || nota == "" || apellido == ""){
			alert("Debe completar todos los Datos!!!");
			return false;
		}else{
			alert("Registro Exitoso!!!");
		}


		var estudiante = {
			codigo:codigo,
			nombre:nombre,
			apellido:apellido,
			nota:nota

		};

		localStorage.setItem(codigo, JSON.stringify(estudiante));
		contador = localStorage.length + 1;

		listarNotas();
		restablecer();

	});

	$("#restablecer").click(function(){
		restablecer();
	});

	function restablecer(){
		$("#codigo").val(contador);
		$("#nombre").val("");
		$("#apellido").val("");
		$("#nota").val("");
	}

	listarNotas();
	$("#nota").val();

});