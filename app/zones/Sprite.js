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