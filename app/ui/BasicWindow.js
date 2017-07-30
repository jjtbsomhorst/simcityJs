"use strict"

class BasicWindow extends UIElement{

    constructor(x,y,context){
        super(x,y,context);
        this.title = "";
    }
    setTitle(t){
        this.title = t;
    }
    
    addElement(element){
        element.setY(element.getY()+16);
        super.addElement(element);
    }
    
    dispose(){
        this.childElements.forEach((e)=>{
            e.dispose();
        });

        super.dispose();
    }
    
    draw(){
        this.context.clearRect(0,0,this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        super.draw();
        this.context.save();
        this.context.fillStyle = brightBlue;
        this.context.fillRect(this.x+1, this.y+1, this.w-1,20);
        this.context.fillStyle = White;
        this.context.fillRect(this.x+1, this.y+16,this.w-1,this.h-20);
        
        this.context.font = "12px Verdana";
        this.context.fillStyle = White;
        let textX = this.x+(this.w/2-((this.title.length/16)/2));
        let textY = this.y+16 - 4;
        this.context.fillText(this.title,textX,textY);


        this.context.rect(this.x,this.y,this.w,this.h);
        this.context.stroke()

        
        this.context.restore();
        this.childElements.forEach((e)=>{
            e.draw(this.context);
        });
        this.removeListeners();
    }
}