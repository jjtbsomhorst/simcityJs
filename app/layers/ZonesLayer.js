"use strict"

class ZonesLayer extends TileLayer{

    constructor(grid){
        super(grid);
        super.removeDrawableZones(['Road','PowerLine','Soil','PowerPlant']);
    }
    
    sendMessage(type,value){

        switch(type){
            case 'newCitizen':
                this.isDirty = true;
            break;
            case 'newEmployee':
                this.isDirty = true;
            break;
        }

        

    }

}