"use strict"

class Tile extends Sprite{
	constructor(src,width,height,offsetX,offsetY){
		let img = new Image();
		img.src = src;
		super(img,width,height,offsetX,offsetY);
	}
}