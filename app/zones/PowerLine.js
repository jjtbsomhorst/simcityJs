"use strict"

class PowerLine extends DemandingZone{
	constructor(x,y){
		super("assets/powerlines.png",x,y);
		this.surroundings;
		super.class = 'PowerLine';
	}

	equalsAll(o, surroundings){
		let equalsAll = true;
		surroundings.forEach((entry)=>{
			if(!(entry instanceof o)){
				return false;
			}
		});
		return equalsAll;
	}

	getSprite(surroundings){
		
		if(this.surroundings == null || !this.surroundings.equals(new BetterSet(surroundings))){
		var center = this;
		var top = new Soil();
		var left = new Soil();
		var right = new Soil();
		var bottom = new Soil();
		var xOffset = 0;
		var yOffset = 0;

		if(surroundings[0] != null){
			top = surroundings[0];
		}

		if(surroundings[2] != null){
			right = surroundings[2];
		}
		if(surroundings[1] != null){
			left = surroundings[1];
		}
		if(surroundings[3] != null){
			bottom = surroundings[3];
		}

		// cross
		if(ZoneLoader.contains(this,top,'superclass') 
			&& ZoneLoader.contains(this,left,'superclass') 
			&& ZoneLoader.contains(this,bottom,'superclass') 
			&& ZoneLoader.contains(this,right,'superclass')){
			
			xOffset = 96;
		}else if(ZoneLoader.contains(this,top,'superclass') && ZoneLoader.contains(this,left,'superclass') &&  ZoneLoader.contains(this,right,'superclass') 
				&& ZoneLoader.contains(this,top,'superclass') && ZoneLoader.contains(this,left,'superclass') &&  ZoneLoader.contains(this,right,'superclass')){
			xOffset = 64

		}else if(ZoneLoader.contains(this,top,'superclass') && ZoneLoader.contains(this,left,'superclass')  && ZoneLoader.contains(this,bottom,'superclass')){
			xOffset = 112;
		}else  if(ZoneLoader.contains(this,top,'superclass') && ZoneLoader.contains(this,left,'superclass')){
			xOffset = 48;
			yOffset = 16;
		}else if(ZoneLoader.contains(this,top,'superclass') && ZoneLoader.contains(this,right,'superclass')  && ZoneLoader.contains(this,bottom,'superclass')){
			xOffset = 96;
			yOffset = 16;
		}else if(ZoneLoader.contains(this,top,'superclass') && ZoneLoader.contains(this,right,'superclass')){
			xOffset = 32;
			yOffset = 16;
		}else if(ZoneLoader.contains(this,bottom,'superclass') && ZoneLoader.contains(this,right,'superclass') && ZoneLoader.contains(this,left,'superclass')){
			xOffset = 80;
			yOffset = 16;
		}else if(ZoneLoader.contains(this,bottom,'superclass') && ZoneLoader.contains(this,right,'superclass')){
			xOffset = 32;
		}	
		else if(ZoneLoader.contains(this,bottom,'superclass') && ZoneLoader.contains(this,left,'superclass')){
			xOffset = 48;
		
		}else if(ZoneLoader.contains(this,left,'superclass') || ZoneLoader.contains(this,right,'superclass')){
			xOffset = 16;
		}
		
		
		this.sprite.offsetX = xOffset;
		this.sprite.offsetY = yOffset;
		this.surroundings = new BetterSet(surroundings);
		}
		return this.sprite;
	}
}