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
        this.menubarNode.innerHTML  = '<b>Funds: 0</b>';
    }

    sendMessage(type,value){
        if(type === "totalfunds"){
            this.menubarNode.innerHTML = "<b>Funds:&nbsp</b>"+value;
            if(value < 0 ){
                this.menubarNode.style.color = "red";
            }else{
                this.menubarNode.style.color = "black";
            }
        }
        
    }

}