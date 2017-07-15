"use strict"

class Soil extends Zone{
	constructor(x,y){
		super("assets/soil.png",x,y);
        super.class = "soilZone";
	}
};