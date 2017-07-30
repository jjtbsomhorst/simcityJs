"use strict"
class InhabitantBar extends MenuBar{

    constructor(grid){
        super();
        this.grid = grid;

    }

    onEvent(event){}

    draw(){
        super.draw();
        this.menubarNode.style.font = "15px verdana, sans-serif";
        this.menubarNode.innerHTML  = '<b>P: 0</b>';
    }

    sendMessage(type,value){
        switch(type){
            case 'newcitizen':
                this.menubarNode.innerHTML = "<b>P:&nbsp</b>"+value;
            break;
        }        
    }

}