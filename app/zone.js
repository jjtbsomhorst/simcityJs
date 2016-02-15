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

};
class residential extends Zone{
	constructor(){
		super("assets/residential.png");
	}
};
class industrial extends Zone{
	constructor(){
		super("assets/industrial.png");
	}
};
class commercial extends Zone{
	constructor(){
		super("assets/commercial.png");
	}
};
class soil extends Zone{
	constructor(){
		super("assets/soil.png");
	}
};

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
			default:
				o = new Zone(); break;
			
			}
			this.cache.set(z,o);
		}
		return this.cache.get(z);
	}


}