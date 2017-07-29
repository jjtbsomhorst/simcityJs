"use strict"

class InformationLayer extends Layer{

    constructor(grid){
        super(grid);
        this.setDrawableZones([]); 
        this.activeWindow = true;
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
            case '':

                
            break;
        }
    }

    utilButtonClicked(msg,value){
        switch(value){
            case "budget":
                this.activeWindow = !this.activeWindow;
                if(this.activeWindow == true){
                    this.context.clearRect(0,0,1024,768);
                }else{
                    let window = new BudgetWindow();
                    window.draw(this.context);
                    console.log("show budget infromation panel");    
                }
                
            break;
            case "TileInfo":
                console.log('show til information window');
            break;
        }
    }

    redraw(){}
}