"use strict"
class game{
	constructor(id){
		this.id = id;
		this.init = false;
		this.node = document.getElementById(this.id);
		this.offsetX = this.node.getClientRects()[0].left;
		this.offsetY = this.node.getClientRects()[0].top;
		window.onload = this.onLoad(event);

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
			
			window.setInterval(function(){
				self.draw();
			},100);	
		}
	}

	onCanvasClick(){
		event.preventDefault();
		console.log("Clicked x: "+event.clientX-this.offsetX);
		console.log("Clicked y: "+event.clientY-this.offsetY);
		console.log('canvas clicked');
	}

	draw(){
		this.grid.draw();

	}
}
var g = new game("canvas");