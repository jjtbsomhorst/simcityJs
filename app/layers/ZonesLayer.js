"use strict"

class ZonesLayer extends TileLayer{

    constructor(grid){
        super(grid);
        super.removeDrawableZones(['Road','PowerLine','Soil','PowerPlant']);
    }
    
    redraw(){
        super.redraw();
    }
}