var nLines = 2;
var rWidth = 50;
var canvas;
var ctx;
var elemLeft;
var elemTop;
var vertices = [];
var initialX = 100;
var initialY = 100;
var tempVertices = [];
var sqrt2 = Math.sqrt(2);
var graphArray;
var nVert = 5; //number of vertices
window.onload = function () {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    elemLeft = canvas.offsetLeft;
    elemTop = canvas.offsetTop;
    loadGraph();
};
function loadGraph() {
    function drawDiagonalLine() {
        ctx.beginPath();
        ctx.moveTo(tempVertices[0].x, tempVertices[0].y);
        ctx.lineTo(tempVertices[1].x, tempVertices[1].y);
        ctx.stroke();
    }
    function generategrah(nVertices) {
        var nV = nVertices;
        //goes over columns
        for (var line = 0; line < 2; line++) {
            //goes over lines
            for (var column = 0; column < Math.ceil(nVertices / 2) && nV > 0; column++, nV--) {
                console.log('column ' + column, 'initialX ' + initialX, 'vezes ' + column * initialX);
                vertices.push({
                    colour: "blue",
                    column: column,
                    line: line,
                    letter: String.fromCharCode(65 + nVertices - nV),
                    x: (rWidth * 3) * column + initialX,
                    y: (rWidth * 3) * line + initialY,
                    i: nVertices - nV
                });
            }
        }
        vertices.forEach(function (element) {
            ctx.fillStyle = element.colour;
            ctx.beginPath();
            ctx.arc(element.x, element.y, rWidth, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = "18px Georgia";
            ctx.fillText(element.letter, element.x - 6, element.y + 6);
        });
    }
    function checkEquality(a, b) {
        if ((a - 1) == b || (a + 1) == b) {
            return true;
        }
        return false;
    }
    function isValidLink() {
        //case for same columns
        if (tempVertices[0].column == tempVertices[1].column &&
            checkEquality(tempVertices[0].line, tempVertices[1].line)) {
            return true;
        }
        else if (tempVertices[0].line == tempVertices[1].line &&
            checkEquality(tempVertices[0].column, tempVertices[1].column)) {
            return true;
        }
        else if (checkEquality(tempVertices[0].line, tempVertices[1].line)
            && checkEquality(tempVertices[0].column, tempVertices[1].column)) {
            return true;
        }
        return false;
    }
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft;
        var y = event.pageY - elemTop;
        vertices.forEach(function (item) {
            if ((y > (item.y - rWidth) && y < item.y + rWidth)
                && (x > (item.x - rWidth) && x < item.x + rWidth)) {
                //alert('clicked an element ['+item.line+' , '+item.column+']');
                tempVertices.push(item);
                if (tempVertices.length == 2) {
                    if (isValidLink()) {
                        alert('valid!!!');
                        drawDiagonalLine();
                        saveOne();
                    }
                    else {
                        alert('invalid!!!');
                    }
                    tempVertices = [];
                }
            }
        });
    });
    generategrah(nVert);
    graphArray = createArray(nVert);
    console.log(graphArray);
}
function saveOne() {
    var temNV = nVert;
    if (tempVertices[0].i < tempVertices[1].i) {
        graphArray[tempVertices[0].i][tempVertices[1].i - tempVertices[0].i] = 1;
    }
    else {
        graphArray[tempVertices[1].i][tempVertices[0].i - tempVertices[1].i] = 2;
    }
    console.log('[0]: ' + tempVertices[0].i);
    console.log('[1]: ' + tempVertices[1].i);
    graphArray.forEach(function (element) {
        console.log(element.toString());
    });
}
function createArray(nVertices) {
    var lines = new Array(nVertices);
    for (var i = 0; i < nVertices; i++) {
        lines[i] = new Array(nVertices - i).fill(0);
    }
    return lines;
}
