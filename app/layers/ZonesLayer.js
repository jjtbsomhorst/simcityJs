"use strict"

class ZonesLayer extends TileLayer{

    constructor(grid){
        super(grid);
        super.removeDrawableZones(['Road','PowerLine','Soil','PowerPlant']);
    }
    
    sendMessage(type,value){

        switch(type){
            case 'newcitizen':
                this.isDirty = true;
            break;
            case 'newemployee':
                this.isDirty = true;
            break;
        }

        

    }

}