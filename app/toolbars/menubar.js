"use strict"

class MenuBar{

    constructor(){
        this.container = null;
        this.menubarNode = null;
        this.menubars = [];
        this.drawn = false;
    }

    setContainer(c){
        
        if(typeof c == 'string'){
            if(document.getElementById(c) != null){
                this.container = document.getElementById(c);
            }
        }else if(c instanceof Element){
            this.container = c;
        }
        this.menubars.forEach((b)=>{
            b.setContainer(this.container);
        });
    }

    addMenuBar(b){
        this.menubars.push(b);
        b.setContainer(this.container);
    }

    draw(){
        if(!this.drawn){
        this.menubarNode = document.createElement("div");
        this.menubarNode.style.float = "left";
        this.container.appendChild(this.menubarNode);

        this.menubars.forEach((b)=>{
            b.draw();
        });

        this.drawn = true;
        }

    }

}