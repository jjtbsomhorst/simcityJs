"use strict"

class ZonesLayer extends TileLayer{

    constructor(grid){
        super(grid);
        super.removeDrawableZones(['Road','PowerLine','Soil','PowerPlant']);
    }
    
    sendMessage(type,value){
        if(type == 'newcitizen'){
            this.isDirty = true;
        }   
    }

}