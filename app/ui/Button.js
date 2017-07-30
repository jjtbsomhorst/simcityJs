"use strict";

class Button extends UIElement{
   
    setLabel(text){
        this.text = text;
        this.font = "Verdana";
        this.fontSize = 12;
    }
    draw(){
        super.draw();
        this.context.save();
        this.context.font = this.fontSize+"px "+this.font;
        this.context.fillStyle = brightBlue;
        this.context.fillRect(this.x+1, this.y+1, this.w-1,this.h);
        this.context.fillStyle = White;
        let textX = this.x+(this.w/2-((this.text.length/16)/2));
        let textY = this.y+16 - 4;
        this.context.fillText(this.text,textX,textY+2);
        
        this.context.restore();
    }
    onMouseClick(event){
        if(this.isMouseOnElement(event)){
            console.log("button clicked");
            this.listener.sendMessage("closeWindow",null);
        }
        
    }
}