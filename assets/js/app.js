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
window.onload = function () {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    elemLeft = canvas.offsetLeft;
    elemTop = canvas.offsetTop;
    loadGraph();
};
function loadGraph() {
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
                    letter: String.fromCharCode(nVertices-nV+65),
                    x: (rWidth * 3) * column + initialX,
                    y: (rWidth * 3) * line + initialY
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
                    }
                    else {
                        alert('invalid!!!');
                    }
                    tempVertices = [];
                }
            }
        });
    });
    generategrah(19);
}
