"use strict"

class Commercial extends DemandingZone{
	constructor(x,y){
		super("assets/commercial.png",x,y);
        super.class = "commercialZone";
	}
};