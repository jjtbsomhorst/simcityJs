"use strict"
class Zone{

	constructor(source,x,y){
		this.sprite = new Image();
		
		if(source == null){
			source = "assets/blank.png";
		}
		this.x = x;
		this.y = y;
		this.powered= false;
		this.watered=false;
		this.sprite.src = source;
	}

	needsPower(){
		return false;
	}
	needsWater(){
		return false;
	}


	setPowered(p){
		//this.powered = p;
	}

	isPowered(){
		return this.powered;
	}
	isWatered(){
		return this.watered;
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

	
	isInhabited(){
		return false;
	}


};

class DemandingZone extends Zone{
	constructor(source,x,y){
		super(source,x,y);
	}
	setPowered(p){
		this.powered = p;
	}
}

class residential extends DemandingZone{
	constructor(x,y){
		super("assets/residential.png",x,y);
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
class industrial extends DemandingZone{
	constructor(x,y){
		super("assets/industrial.png",x,y);
	}
	getClass(){
		return "industrialZone";
	}
};
class commercial extends DemandingZone{
	constructor(x,y){
		super("assets/commercial.png",x,y);
	}
	getClass(){
		return "commercialZone";
	}
};
class soil extends Zone{
	constructor(x,y){
		super("assets/soil.png",x,y);
	}
	getClass(){
		return "soilZone";
	}
};

class PowerPlant extends Zone{
	constructor(x,y){
		super("assets/powerplant.png",x,y)
		this.powered=true;
	}
	needsPower(){
		return false;
	}
	needsWater(){
		return this.watered;
	}
}


class road extends Zone{


	constructor(x,y){
		super("assets/road.png",x,y);
	}

	getClass(){
		return "roadZone";
	}

	needsPower(){
		return false;
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

	static getZoneObject(z,x,y){
		console.log(z);
		var o = null;
		switch(z){
		case "soil":
			o=  new soil(x,y);break;
		case "residential":
			o= new residential(x,y);break;
		case "industrial":
			o= new industrial(x,y);break;
		case "commercial":
			o= new commercial(x,y);break;
		case "road":
			o = new road(x,y);break;
		case "powerplant":
			o = new PowerPlant(x,y);break;
		default:
			o = new Zone(null,x,y); break;
		
		}
		return o;
	}
}