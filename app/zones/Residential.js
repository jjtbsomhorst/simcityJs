"use strict"

class Residential extends DemandingZone{
	constructor(x,y){
		super("assets/residential.png",x,y);
		super.class = "residentialZone";
		this.inhabitants = [];
	}
	addInhhabitant(h){
		this.inhabitants.push(h);
	}
	removeInhabitant(h){
		if(this.inhabitants.indexOf(h) >= 0){
			this.inhabitants.splice(this.inhabitants.indexOf(h),1);
		}
	}

	getInhabitantCount(){
		return this.inhabitants.length;
	}
};