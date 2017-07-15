"use strict"

class Industrial extends DemandingZone{
	constructor(x,y){
		super("assets/industrial.png",x,y);
        super.class = 'industrialZone';
	}
};