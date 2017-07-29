"use strict"

class BasicWindow{

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
        this.title = "";
    }

    setWidth(w){
        this.w = w;
    }

    setTitle(t){
        this.title = t;
    }

    setHeight(h){
        this.h = h;
    }

    draw(context){
        context.clearRect(0,0,context.canvas.clientWidth, context.canvas.clientHeight);
        context.fillRect(this.x,this.y,this.w,this.h);
        
        context.stroke()

    }
}