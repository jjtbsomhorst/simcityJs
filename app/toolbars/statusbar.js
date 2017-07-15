"use strict"

class StatusBar extends MenuBar{

    constructor(grid){
        super();
        this.grid = grid;

    }

    onEvent(event){}

    draw(){
        super.draw();
        this.menubarNode.style.font = "15px verdana, sans-serif";
        this.menubarNode.innerHTML  = 'hello!!';
        
    }

}