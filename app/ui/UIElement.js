"use strict";

class UIElement{
    constructor(x,y,context){
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
        this.setContext(context);
        this.childElements = [];
        this.hasFocus = false;
        this.listener = null;
    }

    addListener(l){
        this.listener = l;
        this.childElements.forEach((e)=>{e.addListener(l)});

    }


    toggleFocus(){
        this.hasFocus = !this.hasFocus;
    }

    setContext(context){
        this.context = context;
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.context.canvas.addEventListener('mousemove',this.onMouseMove);
        this.context.canvas.addEventListener('click',this.onMouseClick);
        this.context.canvas.addEventListener('mousedown',this.onMouseDown);
        window.addEventListener('keyup',this.onKeyUp);
        window.addEventListener('keydown',this.onKeyDown);
    }

    removeListeners(){
        this.context.canvas.removeEventListener('mousemove',this.onMouseMove);
        this.context.canvas.removeEventListener('click',this.onMouseClick);
        this.context.canvas.removeEventListener('mousedown',this.onMouseDown);
        window.removeEventListener('keyup',this.onKeyUp);
        window.removeEventListener('keydown',this.onKeyDown);
    }

    sendMessage(type,value){

    }

    dispose(){
        this.context.clearRect(0,0,this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        this.removeListeners();
    }

    onKeyUp(event){
        
        
    }
    onKeyDown(event){
        
    }

    onMouseDown(event){
        if(this.isMouseOnElement(event)){
        
        }
    }

    onMouseUp(event){
        if(this.isMouseOnElement(event)){
        
        }
    }

    onMouseMove(event){
    
        if(this.isMouseOnElement(event)){
        
        }
    }

    onMouseClick(event){
        if(this.isMouseOnElement(event)){
            if(!this.hasFocus){
                this.hasFocus = true;
            }
        }else{
            this.hasFocus = false;
        }
    }

    addElement(element){
        element.setX(this.x+element.getX());
        element.setY(this.y+element.getY());
        this.childElements.push(element);
    }

    setX(x){
        this.x = x;
    }

    getX(x){
        return this.x;
    }


    setY(y){
        this.y = y;
    }

    getY(y){
        return this.y;
    }

    setWidth(w){
        this.w = w;
    }

    getWidth(){
        return this.w;
    }

    setHeight(h){
        this.h = h;
    }

    getHeight(){
        return this.h;
    }

    draw(){
        this.context.save();
        this.context.fillStyle = Blue;
        this.context.fillRect(this.x,this.y,this.w,this.h);
        this.context.restore();
    }


    
    getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }



    isMouseOnElement(event){
        let mousePos = this.getMousePos(this.context.canvas,event);
        return ((mousePos.x >=  this.x && mousePos.x < this.x+this.w) && (mousePos.y > this.y  && mousePos.y < this.y+this.h));
    }

}