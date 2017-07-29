"use strict"

class BudgetWindow extends BasicWindow{
    constructor(){
        super(100,10);
    }

    draw(context){
        super.setWidth(context.canvas.clientWidth-200);
        super.setHeight(context.canvas.clientHeight-20);
        super.draw(context);
     
    }
}