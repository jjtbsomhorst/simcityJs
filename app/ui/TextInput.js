"use strict"

class TextInput extends UIElement{

    constructor(x,y,context){
        super(x,y,context);
        this.text = "";
        this.setText("");
        this.index = 0;
        this.busy = false;
        this.font = "Verdana";
        this.fontSize = 12;
        this.readOnly = false;
        this.textColor = Blue;
    }

    setReadOnly(r){
        this.readOnly = r;
    }

    setText(t){
        this.context.save();
        this.context.font = this.fontSize+"px "+this.font;
        if(this.context.measureText(t).width < this.getWidth()){
            this.text = t;
        }
        this.context.restore();
    }
    
    draw(){
        super.draw(this.context);
        
        this.context.save();
        this.context.clearRect(this.x,this.y,this.w+1,this.h+1);
        this.context.fillStyle = Blue;
        this.context.fillRect(this.x,this.y,this.w+1,this.h+1);
        this.context.fillStyle = White;
        this.context.fillRect(this.x+1,this.y+1,this.w-1,this.h-1);
        this.context.fillStyle = this.textColor;
        this.context.font = this.fontSize+"px "+this.font;
        this.context.fillText(this.text,this.x+2, this.y+this.h-1,this.getWidth());
        this.context.restore();
        this.busy = false;
    }

    onKeyDown(event){
        event.preventDefault();
        
        if(this.hasFocus && this.busy == false && !this.readOnly){
            
            this.busy = true;
            
            let keycode =event.keyCode;
            switch(keycode){
                case 8:
            
                    if(this.index+this.text.length >= 0){
                        this.setText(this.text.substring(this.index,this.text.length-1));
                        this.index--;
                    }
                    
                    break;
                case 36:
                    this.index = 0;            
                    break;
                default:
                    if(keycode >= 48 && keycode <= 57){
                        this.setText(this.text + event.key);
                        this.index++;
                    }else if(keycode>= 65 && keycode <= 90){
                        this.setText(this.text + event.key);
                        this.index++;
                    }else if(keycode == 32){
                        this.setText(this.text + event.key);
                        this.index++;
                    }
            }
            this.draw();
        }
    }

    

}