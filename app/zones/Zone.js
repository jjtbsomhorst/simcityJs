"use strict"

class Zone{

	constructor(source,x,y){
		var img = new Image();
		this.class = "zone";
		this.id = ZoneLoader.getGuid();

		if(source == null){
			source = "assets/blank.png";
		}
		img.src = source;
		this.sprite = new Sprite(img,16,16,0,0);	
		this.x = x;
		this.y = y;	
	}

	getSprite(){
		return this.sprite;
	}

	getHash(){
		return this.id;
	}

	toString(){
		return this.sprite.src;
	}

	draw(context,x,y,surroundings,c,r){
		context.drawImage(this.getSprite(),x,y);
	}

	getClass(){
		return this.class;
	}

	equals(z){
		return (z.getClass() == this.getClass());
	}

};



