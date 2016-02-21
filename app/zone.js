"use strict"
class Zone{

	constructor(source){
		this.sprite = new Image();
		
		if(source == null){
			source = "assets/blank.png";
		}

		this.sprite.src = source;
	}

	getSprite(){
		return this.sprite;
	}

	toString(){
		return this.sprite.src;
	}

	draw(context,x,y,surroundings,c,r){

		context.drawImage(this.getSprite(),x,y);
	}

	getClass(){
		return "zone";
	}

	equals(z,zones){
		for(var i = 0; i < zones.length;i++){
			if(zones[i] != z.getClass()){
				return false;
			}
		}
		return true;
	}

	needsPower(){
		return false;
	}
	needsWater(){
		return false;
	}

	isPowered(){
		return false;
	}
	isWatered(){
		return false;
	}
	isInhabited(){
		return false;
	}


};
class residential extends Zone{
	constructor(){
		super("assets/residential.png");
	}
	getClass(){
		return "residentialZone";
	}

	needsPower(){
		return true;
	}

	needsWater(){
		return false; // need to be implemented
	}
};
class industrial extends Zone{
	constructor(){
		super("assets/industrial.png");
	}
	getClass(){
		return "industrialZone";
	}
};
class commercial extends Zone{
	constructor(){
		super("assets/commercial.png");
	}
	getClass(){
		return "commercialZone";
	}
};
class soil extends Zone{
	constructor(){
		super("assets/soil.png");
	}
	getClass(){
		return "soilZone";
	}
};

class PowerPlant extends Zone{
	needsPower(){
		return false;
	}
	needsWater(){
		return false;
	}
}


class road extends Zone{


	constructor(){
		super("assets/road.png");
	}

	getClass(){
		return "roadZone";
	}



	draw(context,x,y,surroundings,c,r){
		//debugger;
		var center = this.getClass();
		var top = "blank";
		var left = "blank";
		var right = "blank";
		var bottom = "blank";
		var xOffset = 0;
		var yOffset = 0;

		if(surroundings[0] != null){
			top = surroundings[0].getClass();
		}

		if(surroundings[1] != null){
			left = surroundings[1].getClass();
		}
		if(surroundings[2] != null){
			bottom = surroundings[2].getClass();
		}
		if(surroundings[3] != null){
			right = surroundings[3].getClass();
		}

		if(super.equals(this,[top,left,bottom,right])){
			xOffset = 96;
			yOffset = 0;
		}else if(super.equals(this,[center,left,right,top])){
			xOffset = 112;
			yOffset = 0;
		}else if(super.equals(this,[bottom,center,left,right])){
			xOffset = 80;
			yOffset = 16;
		}else if(super.equals(this,[bottom,center,left,top])){
			xOffset = 64;
			yOffset = 0;
		}else if(super.equals(this,[top,left])){
			xOffset = 48;
			yOffset = 16;
		}else if(super.equals(this,[bottom,center,right,top])){
			xOffset = 96;
			yOffset = 16;

		}else if(super.equals(this,[bottom,center,right])){
			xOffset = 32;
			yOffset = 0;
		}else
		if(super.equals(this,[center,left,right])){
			xOffset = 48;
			yOffset = 0;
		}else if(super.equals(this,[center,right]) && ! super.equals(this,[top,bottom])){
			xOffset = 0;
			yOffset = 0;
		}else
		if(super.equals(this,[right,top])){
			xOffset= 96;
			yOffset = 0;

		}else if(super.equals(this,[bottom,center,top])){
			xOffset = 32;
			yOffset = 16;
		}else if(super.equals(this,[center,left]) || super.equals(this,[bottom,center])){
			xOffset = 16;
			yOffset = 0;
		}
		context.drawImage(this.getSprite(),xOffset,yOffset,16,16,x,y,16,16);
	}

}

class ZoneLoader{

	static getZoneObject(z){
		if(this.cache == null){
			this.cache = new Map();
		}

		if(this.cache.get(z)== null){
			var o = null;
			switch(z){
			case "soil":
				o=  new soil();break;
			case "residential":
				o= new residential();break;
			case "industrial":
				o= new industrial();break;
			case "commercial":
				o= new commercial();break;
			case "road":
				o = new road();break;
			default:
				o = new Zone(); break;
			
			}
			this.cache.set(z,o);
		}
		return this.cache.get(z);
	}
}