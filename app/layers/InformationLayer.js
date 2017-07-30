"use strict"

class InformationLayer extends Layer{

    constructor(grid){
        super(grid);
        this.setDrawableZones([]); 
        this.activeWindow = null;
        
    }

    setZone(coords,newzone){
        let zones = this.grid.getZones(coords);
        var x = this.context;
        var coords = this.grid.getCoordinatesFromPoint(coords);        
    }




    sendMessage(msg,value){
        switch(msg){
            case 'UtilButtonClicked':
                this.utilButtonClicked(msg,value);
                
            break;
            case 'closeWindow':
                this.activeWindow.dispose();
                this.activeWindow= null;
            break;
            case 'getBudgetInformation':   
                let b = this.grid.game.getProcess('FundsProcess').getBudgetInformation();
                value.sendMessage('receiveBudgetInformation',b);
            break;
        }
    }

    utilButtonClicked(msg,value){
        switch(value){
            case "budget":
                if(this.activeWindow!=null){
                    this.activeWindow.dispose();
                    this.activeWindow = null;
                }else{
                    this.activeWindow = new BudgetWindow(this.context);
                    this.activeWindow.addListener(this);
                    this.activeWindow.draw();
                }
            break;
            case "TileInfo":
                
            break;
        }
    }

    redraw(){}
}