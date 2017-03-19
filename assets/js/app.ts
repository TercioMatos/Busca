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
var nVert:number = 5; //number of vertices



window.onload = () => {
   canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
   ctx = canvas.getContext("2d");
   elemLeft = canvas.offsetLeft;
   elemTop = canvas.offsetTop;
   loadGraph();
}

function loadGraph():void{

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

                console.log('column '+ column, 'initialX '+initialX, 'vezes '+ column*initialX);
                
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
            return true;
        }else if(tempVertices[0].line==tempVertices[1].line && 
        checkEquality(tempVertices[0].column,tempVertices[1].column)){
            return true;
        }else if(
            checkEquality(tempVertices[0].line,tempVertices[1].line)
            && checkEquality(tempVertices[0].column,tempVertices[1].column)
        ){
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
                    tempVertices.push(item);
                    if(tempVertices.length==2){
                        if(isValidLink()){
                            alert('valid!!!');
                            drawDiagonalLine();
                            saveOne();
                        }else{
                            alert('invalid!!!');
                        }
                        tempVertices=[];
                    }
                }

        })
    });

    generategrah(nVert);
    graphArray = createArray(nVert);
    console.log(graphArray);
}

function saveOne(){

    let temNV = nVert;
    if(tempVertices[0].i<tempVertices[1].i){
        graphArray[tempVertices[1].i][tempVertices[0].i]=1;
    }else{
        graphArray[tempVertices[0].i][tempVertices[1].i]=1;
    }
    //graphArray[tempVertices[1].i][tempVertices[0].i]=1;
    console.log('[0]: '+tempVertices[0].i);
    console.log('[1]: '+tempVertices[1].i);
    graphArray.forEach((element:number[])=>{
        console.log(element.toString());
    })


    createGraph(graphArray);
}



function createArray(nVertices:number):number[][]{

    let lines = new Array<number[]>(nVertices);
    for(let i = 0; i < nVertices; i++){
        lines[i]=new Array<number>(i+1).fill(0);
    }
    return lines;

}

function createGraph(arr:number[][]):void{

    
    for(let i = 0; i < arr.length; i++){
        //let linha:string = '';
        for(let j = 0; j < arr.length; j++){

            if(j<arr[i].length){
                //linha+=arr[i][j];
                if(arr[i][j]==1){

                }
            }else{
                //linha+=arr[j][i];
                if(arr[j][i]==1)
                {

                }
            }

        }
        
    }
}

let graph:Dijkstra = new Dijkstra();
graph.addVertex('A', { B: 7, C: 8 });
graph.addVertex('C', { A: 8 });
graph.addVertex('B', { A: 7, F: 8 });
graph.addVertex('F', { B: 8 });

console.log(graph.shortestPath('A', 'F'));
