"use strict"
class Zone{
	constructor(source){
		this.sprite = new Image();
		
		if(source == null){
			source = "assets/blank.png";
		}

		this.sprite.src = source;

		this.sprite.onload= function(){
			console.log('sprite loaded');
		}
	}

	getSprite(){
		return this.sprite;
	}

	toString(){
		return this.sprite.src;
	}

	draw(context,x,y,surroundings){
		context.drawImage(this.getSprite(),x,y);
	}

	getClass(){
		return "zone";
	}

};
class residential extends Zone{
	constructor(){
		super("assets/residential.png");
	}
	getClass(){
		return "residentialZone";
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

class road extends Zone{


	constructor(){
		super("assets/road.png");
	}

	getClass(){
		return "roadZone";
	}

	draw(context,x,y,surroundings){
		//d/ebugger;
		//super.draw(context,x,y,surroundings);
		console.log(surroundings);
		context.drawImage(this.getSprite(),0,0,16,16,x,y,16,16);
		if(surroundings[1].getClass() == this.getClass() || surroundings[2].getClass() == this.getClass()){
			context.drawImage(this.getSprite(),16,0,16,16,x,y,16,16);
		
		}
		else if(surroundings[0].getClass() == this.getClass() || surroundings[3].getClass() == this.getClass()){
			context.drawImage(this.getSprite(),0,0,16,16,x,y,16,16);}

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