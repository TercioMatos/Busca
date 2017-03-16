var defaultPosition = 150;
var tamGraph = 80;
var positionX = defaultPosition;
var oldY;
var positionY = defaultPosition;
var cont = 1;
var vertexPosition = {};
var copyConnections = {};

var drawVertex = function(name, objConnections, G) {
	// Passa os valores para a library
	G.addVertex(name, objConnections);

	//criação de dois objetos que serão usados para a criação da conexão

		//contem as ligaçõs
	copyConnections[name] = objConnections;
		//contem as posições
	vertexPosition[name] = {"positionY": positionY, "positionX": positionX};

	// criação dos vértices
	var c = document.getElementById("graph");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(positionX,positionY,tamGraph,0,2*Math.PI);
	
	//especificações para a escrita do nome do vértice
    ctx.font = "bold 18px serif";
    ctx.textBaseline = "bottom";
	ctx.fillText(name, positionX ,positionY);

	// condicional para fazer com que os vértices fiquem lado a lado
	if(cont % 2 == 0) {
		positionX = (positionX+190);
		positionY = oldY;
		cont--;
	}else{
		cont++;
		oldY = positionY;
		positionY = (positionY+180);
	}



	//desenha os vértices
	ctx.stroke();

	ctx.closePath();
}

var getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// função que desenha as conexões
var drawConnection = function(from, to) {
	var valor = copyConnections[from][to];
	//atrivui os vértices as variáveis
	var from = vertexPosition[from];
	var to = vertexPosition[to]; 

	var c = document.getElementById("graph");
	var ctx = c.getContext("2d");
	var color = getRandomColor();

	ctx.beginPath();
	ctx.strokeStyle = color;

	//especificações para a escrita do nome do vértice
    ctx.font = "18px serif";
    ctx.textBaseline = "bottom";
    linePositionX = (from.positionX + to.positionX) / Math.floor(Math.random() + 2);
    linePositionY = (from.positionY + to.positionY) / Math.floor(Math.random() + 2);
	ctx.fillText(valor, linePositionX ,linePositionY);

	ctx.moveTo(from.positionX, from.positionY);
	ctx.lineTo(to.positionX,to.positionY);

	ctx.stroke();
	ctx.closePath();
}

var buildConnections = function() {
	for(from in copyConnections) {
		for(to in copyConnections[from]) {
			drawConnection(from, to);
		}
	}
}

var mountClosestPath = function(items) {
	for(item in items) {

	}
}