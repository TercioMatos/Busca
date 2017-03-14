var tamGraph = 30;
var positionX = 80;
var oldY;
var positionY = 80;
var cont = 1;
var vertexPosition = {};
var copyConnections = {};

var drawGraph = function(name, objConnections, G) {
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

	// condicional para fazer com que os vértices fiquem lado a lado
	if(cont % 2 == 0) {
		positionX = (positionX+100);
		positionY = oldY;
		cont--;
	}else{
		cont++;
		oldY = positionY;
		positionY = (positionY+90);
	}

	//desenha os vértices
	ctx.stroke();
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

	var c = document.getElementById("graph");
	var ctx = c.getContext("2d");
	var color = getRandomColor();

	ctx.beginPath()
	ctx.strokeStyle = color;

	ctx.moveTo(from.positionX, from.positionY);
	ctx.lineTo(to.positionX,to.positionY);

	ctx.stroke();
	ctx.closePath()
}

var buildConections = function(vertexPosition, copyConnections) {
	for(from in copyConnections) {
		for(to in copyConnections[from]) {
			drawConnection(vertexPosition[from], vertexPosition[to])
		}
	}
}



var g = new Graph();

drawGraph('A', {B: 7, C: 8}, g);
drawGraph('B', {A: 7, F: 2}, g);
drawGraph('C', {A: 8, F: 6, G: 4}, g);
drawGraph('D', {F: 8}, g);
drawGraph('E', {H: 1}, g);
drawGraph('F', {B: 2, C: 6, D: 8, G: 9, H: 3}, g);
drawGraph('G', {C: 4, F: 9}, g);
drawGraph('H', {E: 1, F: 3}, g);


console.log();
console.log();

buildConections(vertexPosition, copyConnections);

// Log test, with the addition of reversing the path and prepending the first node so it's more readable
console.log(g.shortestPath('A', 'H'));//.concat(['A']).reverse());
