"use strict"

class Road extends Zone{


	constructor(x,y){
		super("assets/road.png",x,y);
		this.surroundings = null;
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
			if(ZoneLoader.contains(this,top,'class') 
				&& ZoneLoader.contains(this,left,'class') 
				&& ZoneLoader.contains(this,bottom,'class') 
				&& ZoneLoader.contains(this,right,'class')){
				
				xOffset = 96;
			}else if(ZoneLoader.contains(this,top,'class') && ZoneLoader.contains(this,left,'class') &&  ZoneLoader.contains(this,right,'class')){
				xOffset = 64

			}else if(ZoneLoader.contains(this,top,'class') && ZoneLoader.contains(this,left,'class')  && ZoneLoader.contains(this,bottom,'class')){
				xOffset = 112;
			}else  if(ZoneLoader.contains(this,top,'class') && ZoneLoader.contains(this,left,'class')){
				xOffset = 48;
				yOffset = 16;
			}else if(ZoneLoader.contains(this,top,'class') && ZoneLoader.contains(this,right,'class')  && ZoneLoader.contains(this,bottom,'class')){
				xOffset = 96;
				yOffset = 16;
			}else if(ZoneLoader.contains(this,top,'class') && ZoneLoader.contains(this,right,'class')){
				xOffset = 32;
				yOffset = 16;
			}else if(ZoneLoader.contains(this,bottom,'class') && ZoneLoader.contains(this,right,'class') && ZoneLoader.contains(this,left,'class')){
				xOffset = 80;
				yOffset = 16;
			}else if(ZoneLoader.contains(this,bottom,'class') && ZoneLoader.contains(this,right,'class')){
				xOffset = 32;
			}	
			else if(ZoneLoader.contains(this,bottom,'class') && ZoneLoader.contains(this,left,'class')){
				xOffset = 48;
			
			}else if(ZoneLoader.contains(this,left,'class') || ZoneLoader.contains(this,right,'class')){
				xOffset = 16;
			}
			
			
			this.sprite.offsetX = xOffset;
			this.sprite.offsetY = yOffset;
			this.surroundings = new BetterSet(surroundings);
		}
		return this.sprite;
	}
}