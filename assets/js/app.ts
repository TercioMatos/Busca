import {Dijkstra} from "./libs/dijkstras-algorithm-master/dijkstra";

interface IVertice{
    colour: string,
    y: number,
    x: number,
    column:number,
    line:number,
    letter:string,
    i:number
}
var nLines:number = 2;
var rWidth:number = 50;
var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var elemLeft:number;
var elemTop:number;
var vertices:IVertice[]=[];
var initialX:number = 100;
var initialY:number = 100;
var tempVertices:IVertice[]=[];
var sqrt2:number=Math.sqrt(2);
var graphArray:number[][];
var nVert:number = 10; //number of vertices
let graph:Dijkstra;


window.onload = () => {

   canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
   ctx = canvas.getContext("2d");
   elemLeft = canvas.offsetLeft;
   elemTop = canvas.offsetTop;

   loadGraph();

}





function loadGraph():void{

    document.getElementById("inserir").addEventListener('click', (event)=>{

        //parseInt(document.getElementById("qtdVertices").textContent);
        var input:HTMLInputElement = <HTMLInputElement> document.getElementById("qtdVertices");
        nVert = parseInt(input.value);
        if(!isNaN(nVert) && nVert >=1 && nVert<=20){
            vertices=[];
            graphArray=[];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
 
            generategrah(nVert);
            graphArray = createArray(nVert);
        }else{
            console.log("Digite apenas numeros entre 1-20");
        }
    });


    document.getElementById("calcDistance").addEventListener('click', (event)=>{

        var vDeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("vDe");
        var vAteInput:HTMLInputElement = <HTMLInputElement> document.getElementById("vAte");

        graphArray.forEach((element:number[])=>{
            console.log(element.toString());
        })
        createGraph(graphArray,vDeInput.value.toString().toUpperCase(), vAteInput.value.toString().toUpperCase());
        console.log("Distancia Manhattan: "+ calcDistanceManhattan(vDeInput.value.toString().toUpperCase(), vAteInput.value.toString().toUpperCase()));
    });

    function calcDistanceManhattan(vDe:string, vAte:string):number{
        //dm = |x1 - x2| + |y1 - y2|
        let p1:IVertice;
        let p2:IVertice;
        vertices.forEach(vertice => {
            if(vertice.letter==vDe){
                p1=vertice;
            }
            if(vertice.letter==vAte){
                p2=vertice;
            }
        })
        if(p1 && p2){
            let distance =  (p1.column - p2.column) + (p1.line - p2.line);
            if(distance<0){
                distance*=-1;
            }
            return distance;
        }else{
            return 0;
        }
    }

    function drawDiagonalLine(){
        ctx.beginPath();
        ctx.moveTo(
            tempVertices[0].x ,
            tempVertices[0].y 
        );
        ctx.lineTo(
            tempVertices[1].x ,
            tempVertices[1].y 
        );
        ctx.stroke();
    }

    function generategrah(nVertices:number){

        let nV:number = nVertices;
        
        //goes over columns
        for(let line:number=0; line< 2; line++){
            //goes over lines
            for(let column:number=0; column < Math.ceil(nVertices/2) && nV > 0; column++, nV--){

                //console.log('column '+ column, 'initialX '+initialX, 'vezes '+ column*initialX);
                
                vertices.push({
                    colour:"blue",
                    column:column,
                    line:line,
                    letter:String.fromCharCode(65+ nVertices - nV),
                    x:(rWidth*3)* column + initialX,
                    y:(rWidth*3)* line + initialY,
                    i:nVertices - nV
                })

            }
        }

        vertices.forEach((element: IVertice)=> {
            
            ctx.fillStyle = element.colour;
            ctx.beginPath();
            ctx.arc(element.x, element.y, rWidth, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font="18px Georgia";
            ctx.fillText(element.letter, element.x-6, element.y+6);

        });

    }
    function checkEquality(a:number, b:number):boolean{
        if((a-1)==b || (a+1)==b){
            return true;
        }
        return false;
    }

    function isValidLink():boolean{

        //case for same columns
        if(tempVertices[0].column==tempVertices[1].column && 
        checkEquality(tempVertices[0].line,tempVertices[1].line)){
            saveValue(1);
            return true;
        }else if(tempVertices[0].line==tempVertices[1].line && 
        checkEquality(tempVertices[0].column,tempVertices[1].column)){
            saveValue(1);
            return true;
        }else if(
            checkEquality(tempVertices[0].line,tempVertices[1].line)
            && checkEquality(tempVertices[0].column,tempVertices[1].column)
        ){
            saveValue(sqrt2);
            return true;
        }
        return false;
    }

    canvas.addEventListener('click',(event)=>{
        var x:number = event.pageX - elemLeft;
        var y:number = event.pageY - elemTop;
        
        vertices.forEach((item:IVertice)=>{

                if ((y > (item.y-rWidth) && y < item.y + rWidth) 
                && (x > (item.x - rWidth) && x < item.x + rWidth)){

                    //alert('clicked an element ['+item.line+' , '+item.column+']');
                    //console.log(tempVertices.length);
                    tempVertices.push(item);
                    if(tempVertices.length>=2){
                        if(isValidLink()){
                            alert('valid!!!');
                            drawDiagonalLine();
                        }else{
                            alert('invalid!!!');
                        }
                        tempVertices=[];
                    }
                }

        })
    });

   // generategrah(nVert);
    //graphArray = createArray(nVert);
    //console.log(graphArray);
}

function saveValue(value:number){

    let temNV = nVert;
    if(tempVertices[0].i<tempVertices[1].i){
        graphArray[tempVertices[1].i][tempVertices[0].i]=value;
    }else{
        graphArray[tempVertices[0].i][tempVertices[1].i]=value;
    }
    //graphArray[tempVertices[1].i][tempVertices[0].i]=1;
    //console.log('[0]: '+tempVertices[0].i);
    //console.log('[1]: '+tempVertices[1].i);

    //createGraph(graphArray);
}



function createArray(nVertices:number):number[][]{

    let lines = new Array<number[]>(nVertices);
    for(let i = 0; i < nVertices; i++){
        lines[i]=new Array<number>(i+1).fill(0);
    }
    return lines;

}

function createGraph(arr:number[][],vDe:string,vAte:string):void{

    graph = new Dijkstra();    
    for(let i = 0; i < arr.length; i++){
        let edge: Object = {};
        for(let j = 0; j < arr.length; j++){

            if(j<arr[i].length){
                if(arr[i][j]>=1){
                    edge[String.fromCharCode(65+j)]= arr[i][j];
                }
            }else{
                if(arr[j][i]>=1)
                {
                    edge[String.fromCharCode(65+j)]= arr[j][i];
                }
            }
        }
        graph.addVertex(String.fromCharCode(65+i),edge);
        
    }
    console.log(graph.shortestPath(vDe, vAte));
    console.log("Distance: "+ graph.calcDistance(graph.shortestPath(vDe, vAte)));
}

