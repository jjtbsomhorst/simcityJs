"use strict"

class RoadGrid extends TileLayer{

    constructor(grid){
        super(grid);
        super.setDrawableZones(['Road']);
    }
    
    acceptZone(coordinates,zone,previousZones){
        var returnValue = super.acceptZone(coordinates,zone,previousZones);
        if(returnValue){
            var zones = this.grid.getZones(coordinates);
            
            zones.forEach((z)=>{
                if(z != null && !(z instanceof PowerLine)){
                    returnValue = false;
                }
            });
        }
		return returnValue;
	}

    setZone(coordinates,zone){
        super.setZone(coordinates,zone);
    }
}