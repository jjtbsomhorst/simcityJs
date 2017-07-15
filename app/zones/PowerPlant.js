"use strict"

class PowerPlant extends DemandingZone{
	constructor(x,y){
		super("assets/powerplant.png",x,y)
		super.setPowered(true);
        super.class = "PowerPlant";
	}
	needsPower(){
		return false;
	}
	needsWater(){
		return this.watered;
	}
}