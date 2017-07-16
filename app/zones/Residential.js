"use strict"

class Residential extends DemandingZone{
	constructor(x,y){
		super("assets/residential.png",x,y);
		
		super.class = "residentialZone";
		this.inhabitants = [];
		this.maxInhabitantCount = Math.floor(Math.random() * 250) + 1 ;;
		
		
	}
	addInhabitant(h){
		if(this.inhabitants.length < this.maxInhabitantCount){
			this.inhabitants.push(h);
		}
	}
	
	removeInhabitant(h){
		if(this.inhabitants.indexOf(h) >= 0){
			this.inhabitants.splice(this.inhabitants.indexOf(h),1);
		}
	}

	getSprite(){
		if(this.inhabitants.length > 0){
		if(this.maxInhabitantCount > 0){
			if(this.maxInhabitantCount <10){
				this.sprite.offsetX = 16;
				this.sprite.offsetY = 0;
			}else if(this.maxInhabitantCount <20){
				this.sprite.offsetX = 0;
				this.sprite.offsetY = 16;
			}else if(this.maxInhabitantCount > 20){
				this.sprite.offsetX = 16;
				this.sprite.offsetY = 16;
			}
		}
		}
		return super.getSprite();
		
	}

	getMaxInhabitantCount(){
		return this.maxInhabitantCount;
	}

	getInhabitantCount(){
		return this.inhabitants.length;
	}
};