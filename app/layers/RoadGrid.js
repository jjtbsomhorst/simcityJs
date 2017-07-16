"use strict"

class RoadGrid extends TileLayer{

    constructor(grid){
        super(grid);
        super.setDrawableZones(['Road']);
    }
    
    acceptZone(coordinates,zone,previousZones){
        var returnValue = super.acceptZone(coordinates,zone,previousZones);
        if(returnValue){
            var zones = this.grid.getZones(coordinates,true);
            
            zones.forEach((z)=>{
                if(z != null && !(z instanceof PowerLine)){
                    returnValue = false;
                }
            });
        }
		return returnValue;
	}

    
}