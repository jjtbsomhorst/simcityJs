"use strict"

class TextLabel extends UIElement{

    constructor(x,y,context){
        super(x,y,context);
        this.font = "Verdana";
        this.fontSize = 12;
        this.fontColor = White;
    }

    setText(t){
        this.text = t;
    }

    getText(){
        return this.text;
    }

    setFont(f){
        this.font = f;
    }
    setFontSize(size){
        this.fontSize = size;
    }

    draw(){
        super.draw();
        this.context.save();
        this.context.clearRect(this.x,this.y,this.w+1,this.h+1);
        this.context.fillStyle = White;
        this.context.fillRect(this.x,this.y,this.w+1,this.h+1);
        this.context.fillStyle = Blue;
        this.context.font = this.fontSize+"px "+this.font;
        this.context.fillText(this.text,this.x+2, this.y+this.h-1);
        this.context.restore();
    }

}