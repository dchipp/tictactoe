function play(element){

    if(element.classList.contains("taken"))return;
    
    let mainDiv = document.createElement("div");
    let figureDiv = document.createElement("div");
    mainDiv.classList.add("circle");
    figureDiv.classList.add("figure")
    figureDiv.append(mainDiv)
    element.append(figureDiv)

    element.classList.add("taken");
}