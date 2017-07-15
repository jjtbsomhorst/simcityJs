"use strict"

class Residential extends DemandingZone{
	constructor(x,y){
		super("assets/residential.png",x,y);
        super.class = "residentialZone";
	}
};