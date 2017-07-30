"use strict"

class BudgetWindow extends BasicWindow{
    constructor(context){
        super(100,10,context);
        this.rows = new Map();
        this.budgetInfo = null;
        this.init();
    }

    init(){
        this.setTitle("Budget");

        

        this.addRow("Residential",5,5,true);
        this.addRow("Industrial",5,26,true);
        this.addRow("Commercial",5,47,true);

        this.addRow("Power",400,5,true);
        this.addRow("Road",400,26,true);
        this.addRow("Water",400,47,true);
        let b = new Button(100,100,this.context);
        b.setHeight(20);
        b.setWidth(100);
        b.setLabel("Ok");
        this.addElement(b);
        
    }
    
    sendMessage(type,value){
        switch(type){
            case 'receiveBudgetInformation':
                this.budgetInfo = value;
                this.setRowValue('Residential',value.get('Residential'));
                this.setRowValue('Industrial',value.get('Industrial'));
                this.setRowValue('Commercial',value.get('Commercial'));
                this.setRowValue('Power',value.get('Power'));
                this.setRowValue('Road',value.get('Road'));
                this.setRowValue('Water',value.get('Water'));
                this.draw();
            break;
        }
    }

    setRowValue(row,value){
        this.childElements.forEach( (e,index)=>{
            if(e instanceof TextLabel && e.getText() == row){
                this.childElements[index+1].setText(value);
            }
        });
    }


    addRow(txtLabel,x,y,readonly){
        
        let tl = new TextLabel(x,y,this.context);
        tl.setWidth(100);
        tl.setHeight(16);
        tl.setText(txtLabel);
        let t = new NumberInput(tl.getWidth()+x,y,this.context);
        t.setHeight(16);
        t.setWidth(100);
        t.setReadOnly(readonly);
        this.addElement(tl);
        this.addElement(t);
    }

    

    draw(){
        super.setWidth(this.context.canvas.clientWidth-200);
        super.setHeight(this.context.canvas.clientHeight-20);
        super.draw();
        if(this.budgetInfo == null){
            this.listener.sendMessage("getBudgetInformation",this);
        }
    }
}