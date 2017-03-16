var clearFormFields = function() {
	var campos = document.getElementsByClassName('form-control');
	campos[0].value = "";		
	campos[1].value = "";		
}

var message = function (text, status) {
	var defaultMessages = {
		"success": "alert-success",
		"error": "alert-danger",
		"warning": "alert-warning",
	}

	if(defaultMessages[status] == undefined)
		status = "warning"; 

	var message = document.getElementById("message");
	message.classList.add(defaultMessages[status]);
	message.classList.remove("hidden");
	message.innerHTML = text;
	setTimeout(function() {
		message.classList.add("hidden");
		message.classList.remove(defaultMessages[status]);
		message.innerHTML = "";
	}, 3000);

	if(status == "error")
		throw new Error(text);
}

var buildValuesVert = function (keyVertex, amountValues) {
	var obj = {};
	var values = amountValues.split(";");

	if(values[values.length - 1] == "")
		values.splice(-1);

	for (value in values) {
		var item = values[value].split("=");
		//verifica se algum valor tem o mesmo nome do vértice
		if(item.length != 2) {
			message("O campo de valores está inválido, siga o exemplo do placeholder","error");
		}

		if(item[0].toUpperCase().localeCompare(keyVertex) == 0) {
			message("Os valores não podem indicar o próprio vértice","error");
		}

		obj[item[0].toUpperCase()] = item[1];
	}

	return obj;
}
var inserir = function() {
	var inputs = document.getElementsByClassName('novo-vertice');
	
	if(inputs[0].value == "" || inputs[0].value == undefined || inputs[1].value == "" || inputs[1].value == undefined){
		message("Algum campo está inválido","error");
	}
	var key = inputs[0].value.toUpperCase();

	var obj = buildValuesVert(key,inputs[1].value);
	drawVertex(key, obj, g);
	message("Grafo gerado", "success");
	clearFormFields();
}

var melhorCaminho = function() {
	var campoCaminho = document.getElementsByClassName("procura-caminho");
	if(campoCaminho[0].value == "" || campoCaminho[0].value == undefined || campoCaminho[1].value == "" || campoCaminho[1].value == undefined){
		message("Algum campo está inválido","error");
	}

	var valorInicio = campoCaminho[0].value.toUpperCase();
	var valorDestino = campoCaminho[1].value.toUpperCase();
	var menorCaminho = g.shortestPath(valorInicio, valorDestino);
	console.log(menorCaminho);
}

var finalizar = function() {
	buildConnections();
}

var validaProcura = function() {
	var formBusca = document.getElementById('formBusca');
	if(Object.keys(g.vertices).length == 0) {
		var mensagemBusca = document.getElementById('busca');
		formBusca.classList.add("hidden");
		mensagemBusca.innerHTML = "Deve existir algum grafo para que a procura seja feita";
	}else{
		var mensagemBusca = document.getElementById('busca');
		mensagemBusca.innerHTML = "";
		formBusca.classList.remove("hidden");
	}
}