"use strict"

class Sprite{
	constructor(img,width, height, offsetX, offsetY){
		this.img =img;
		this.w = width;
		this.h = height;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}

	getSprite(){
		return this.img;
	}

	get width(){
		return this.w;
	}
	get height(){
		return this.h;
	}
}

class Tile extends Sprite{
	constructor(src,width,height,offsetX,offsetY){
		var img = new Image();
		img.src = src;
		super(img,width,height,offsetX,offsetY);
	}
}



class Zone{

	constructor(source,x,y){
		var img = new Image();
		

		if(source == null){
			source = "assets/blank.png";
		}
		img.src = source;
		this.sprite = new Sprite(img,16,16,0,0);		
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

	equals(z){
		return (z.getClass() == this.getClass());
	}
	
	isInhabited(){
		return false;
	}


};

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

class residential extends DemandingZone{
	constructor(x,y){
		super("assets/residential.png",x,y);
	}
	getClass(){
		return "residentialZone";
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


class road extends DemandingZone{


	constructor(x,y){
		super("assets/road.png",x,y);
	}

	getClass(){
		return "roadZone";
	}

	needsPower(){
		return false;
	}

	needsWater(){
		return faĺse;
	}

	getSprite(surroundings){
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

		if(ZoneLoader.equalsAll(this,[top,left,bottom,right])){
			xOffset = 96;
			yOffset = 0;
		}else if(ZoneLoader.equalsAll(this,[center,left,right,top])){
			xOffset = 112;
			yOffset = 0;
		}else if(ZoneLoader.equalsAll(this,[bottom,center,left,right])){
			xOffset = 80;
			yOffset = 16;
		}else if(ZoneLoader.equalsAll(this,[bottom,center,left,top])){
			xOffset = 64;
			yOffset = 0;
		}else if(ZoneLoader.equalsAll(this,[top,left])){
			xOffset = 48;
			yOffset = 16;
		}else if(ZoneLoader.equalsAll(this,[bottom,center,right,top])){
			xOffset = 96;
			yOffset = 16;

		}else if(ZoneLoader.equalsAll(this,[bottom,center,right])){
			xOffset = 32;
			yOffset = 0;
		}else
		if(ZoneLoader.equalsAll(this,[center,left,right])){
			xOffset = 48;
			yOffset = 0;
		}else if(ZoneLoader.equalsAll(this,[center,right]) && ! ZoneLoader.equalsAll(this,[top,bottom])){
			xOffset = 0;
			yOffset = 0;
		}else
		if(ZoneLoader.equalsAll(this,[right,top])){
			xOffset= 96;
			yOffset = 0;

		}else if(ZoneLoader.equalsAll(this,[bottom,center,top])){
			xOffset = 32;
			yOffset = 16;
		}else if(ZoneLoader.equalsAll(this,[center,left]) || ZoneLoader.equalsAll(this,[bottom,center])){
			xOffset = 16;
			yOffset = 0;
		}
		
		this.sprite.offsetX = xOffset;
		this.sprite.offsetY = yOffset;
		return this.sprite;
	}
}

class ZoneLoader{

	static equalsAll(source,comparTo){
		for(var i = 0; i < comparTo.length;i++){
			if(comparTo[i] != source.getClass()){
				return false;
			}
		}
		return true;
	}


	static getZoneObject(z){
		var o = null;
		var x=0;
		var y=0;
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