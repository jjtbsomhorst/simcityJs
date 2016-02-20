"use strict"
class game{
	constructor(id){
		this.id = id;
		this.init = false;
		this.node = document.getElementById(this.id);
		this.offsetX = this.node.getClientRects()[0].left;
		this.offsetY = this.node.getClientRects()[0].top;
		window.onload = this.onLoad(event);
		this.frameCount = 0;
		this.maxFrameCount = 15;
	}

	onLoad(event){
		this.initCanvas();
		this.toolbar = new Toolbar(this.grid);
	}

	initCanvas(){
		var self = this;
		if(!this.init){
			console.log('load stuff');
			
			this.height = this.node.getAttribute("height");
			this.width = this.node.getAttribute("width");
			this.grid = new Grid(this.height/16,this.width/16,this.width,this.height,this.node);
			this.init = true;
			this.draw();
		}
	}

	onCanvasClick(){
		event.preventDefault();
	}

	draw(){
		if(this.canDraw()){
			this.grid.draw(this.onDrawComplete);
		}
		window.requestAnimationFrame(this.draw.bind(this));

	}

	canDraw(){
		this.frameCount++;
		if(this.frameCount == this.maxFrameCount){
			this.frameCount = 0;
		}

		return (this.frameCount == 0);
	}

		
}
window.g = new game("canvas");

