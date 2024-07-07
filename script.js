let turn = 0;
let playing = true;
let playArea = document.getElementById("playArea");
let winnerTitle = document.getElementById("winnerContainer");
let restartText = document.getElementById("restartText");
winnerTitle.innerText="";
restartText.innerText="";
let circleColor = "#2c65df";
let crossColor = "#ff3737";
let restarting = false;
let bot = true;
let botTurn = false;

function play(element){
    if(element.classList.contains("taken"))return;
    if(!playing)return;
    
    if(turn==0){
        let circleFigureDiv = document.createElement("div");
        let circleDiv = document.createElement("div");
        
        circleDiv.classList.add("circle");
        circleFigureDiv.classList.add("circleFigure");

        circleFigureDiv.append(circleDiv);
        element.append(circleFigureDiv);
        element.classList.add("hasCircle");
        turn=1;
        checkWin();
    } else {
        let crossFigureDiv = document.createElement("div");
        let crossSegmentOneDiv = document.createElement("div");
        let crossSegmentTwoDiv = document.createElement("div");

        crossFigureDiv.classList.add("crossFigure");

        crossSegmentOneDiv.classList.add("segment");
        crossSegmentOneDiv.classList.add("one");
        crossSegmentTwoDiv.classList.add("segment");
        crossSegmentTwoDiv.classList.add("two");

        crossFigureDiv.append(crossSegmentOneDiv);
        crossFigureDiv.append(crossSegmentTwoDiv);
        
        element.append(crossFigureDiv);
        element.classList.add("hasCross");
        turn=0;
        checkWin();
    }
    
    element.classList.add("taken");
    
    if(bot&&!botTurn){
        botTurn=true;
        botMove();
    }
}

function botMove(){
    if(!playing)return;
        let cells = Array.from(document.querySelectorAll(".figure"))
        let chosen = Math.floor(Math.random()*9)
        if(cells[chosen].classList.contains("taken")){
         console.log("retrying");
            return botMove();
        } else {
            play(cells[chosen]);
            botTurn=false;
        }
        
    
}

function checkWin(){
    let cells = Array.from(document.querySelectorAll(".figure"))
    if(checkLine(cells, 0,1,2)){
        win("row-top");
        hide(cells, 0,1,2);
        return;
    }
    if(checkLine(cells, 0,3,6)){
        win("column-left");
        hide(cells, 0,3,6);
        return;
    }
    if(checkLine(cells, 0,4,8)){
        win("diag-dec");
        hide(cells, 0,4,8);
        return;
    }
    if(checkLine(cells, 2,4,6)){
        win("diag-inc");
        hide(cells, 2,4,6);
        return;
    }
    if(checkLine(cells, 3,4,5)){
        win("row-mid");
        hide(cells, 3,4,5);
        return;
    }
    if(checkLine(cells, 1,4,7)){
        win("column-mid");
        hide(cells, 1,4,7);
        return;
    }
    if(checkLine(cells, 2,5,8)){
        win("column-right");
        hide(cells, 2,5,8);
        return;
    }
    if(checkLine(cells, 6,7,8)){
        win("row-bot");
        hide(cells, 6,7,8);
        return;
    }
}

function checkLine(cells, a, b, c){
    let figureID = ["hasCross","hasCircle"];
    let won = true;
    if(!cells[a].classList.contains(figureID[turn]))won=false;
    if(!cells[b].classList.contains(figureID[turn]))won=false;
    if(!cells[c].classList.contains(figureID[turn]))won=false;

    return won;
}

function win(type){
    let line = document.createElement("div");
    line.classList.add("figure");
    line.id="line";
    playArea.append(line);
    if(turn==0){
        line.style.backgroundColor=crossColor;
        winnerTitle.style.color=crossColor;
        restartText.style.color=crossColor;
        winnerTitle.innerText="Cross wins!"
    } else {
        line.style.backgroundColor=circleColor;
        winnerTitle.style.color=circleColor;
        restartText.style.color=circleColor;
        winnerTitle.innerText="Circle wins!"
    }
    if(window.innerWidth<600){
        restartText.innerText="Tap anywhere to restart"
    } else {
        restartText.innerText="Click anywhere to restart"
    }
    switch(type){
        case type="row-top":
            line.classList.add("row");
            line.classList.add("row-top");
            break;
        case type="row-mid":
            line.classList.add("row");
            line.classList.add("row-mid");
            break;
        case type="row-bot":
            line.classList.add("row");
            line.classList.add("row-bot");
            break;
        case type="column-left":
            line.classList.add("column");
            line.classList.add("column-left");
            break;
        case type="column-mid":
            line.classList.add("column");
            line.classList.add("column-mid");
            break;
        case type="column-right":
            line.classList.add("column");
            line.classList.add("column-right");
            break;
        case type="diag-dec":
            line.classList.add("diag-dec");
            break;
        case type="diag-inc":
            line.classList.add("diag-inc");
            break;
    }

    playing=false;
}

function hide(cells,a,b,c){
    cells.forEach((x,i) =>{
        if(i!=a&&i!=b&&i!=c){
            x.style.opacity="20%";
        }
    })
}
document.body.addEventListener('click', restart);
function restart(){
    if(playing)return;
    if(!restarting)return restarting=true;
    if(bot)botTurn=false;
    document.getElementById("line").remove();
    winnerTitle.innerText="";
    winnerTitle.style.color="transparent";
    restartText.innerText="";
    restartText.style.color="transparent";
    let cells = Array.from(document.querySelectorAll(".figure"))
    cells.forEach(x=>{
        let delChild = x.lastChild;
        x.classList.remove("hasCircle");
        x.classList.remove("taken");
        x.classList.remove("hasCross");
        x.style.opacity="100%"
        while (delChild) {
            x.removeChild(delChild);
            delChild = x.lastChild;
        }
    })
    restarting=false;
    playing=true;
    turn=0;
    
} 
