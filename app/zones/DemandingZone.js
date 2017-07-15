"use strict"

class DemandingZone extends Zone{

	constructor(source,x,y){
		super(source,x,y);
		this.powered= false;
		this.watered= false;
	}
	setPowered(p){
		this.powered = p;
	}
	
	needsPower(){
		return true;
	}

	needsWater(){
		return false;
	}

	isPowered(){
		return this.powered;
	}
	isWatered(){
		return this.watered;
	}

}