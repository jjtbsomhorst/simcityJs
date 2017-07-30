"use strict"

class NumberInput extends TextInput{
    
    draw(context){
        super.draw(context);
    };

    

    setText(t){
        if(!isNaN(parseFloat(t)) && isFinite(t)){
            super.setText(t);
        }else{
            super.setText(0);
        }
    }

    draw(){
        if(parseFloat(this.text) < 0){
            this.textColor = brightRed;
        }else{

        }
        super.draw(this.context);
    }

    onKeyDown(event){
        event.preventDefault();
        
        if(this.hasFocus && this.busy == false){
            
            this.busy = true;
            
            let keycode =event.keyCode;
            switch(keycode){
                case 8:
                    console.log(this.index+this.text.length);
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
                    }
            }
            this.draw();
        }
    }
}