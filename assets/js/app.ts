interface IVertice{
    colour: string,
    y: number,
    x: number,
    column:number,
    line:number,
    letter:string
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
                    y:(rWidth*3)* line + initialY
                })

            }
        }

        vertices.forEach((element: IVertice)=> {
            
            ctx.fillStyle = element.colour;
            ctx.beginPath();
            ctx.arc(element.x, element.y, rWidth, 0, 2*Math.PI);
            ctx.stroke();
            ctx.font="18px Georgia";
            ctx.fillText(element.letter,element.x-6,element.y+6);

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
                        }else{
                            alert('invalid!!!');
                        }
                        tempVertices=[];
                    }
                }

        })
    });

    generategrah(19);

}


