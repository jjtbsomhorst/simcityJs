"use strict"
class Grid{

	constructor(c,r,w,h,container){
		
		this.layers = [];
		
		this.layers.push(new Layer(r,c,w,h,"",container));
		this.layers.push(new Layer(r,c,w,h,"soil",container));
		this.layers[0].setForeGround();
		this.currentTool = null;
		container.addEventListener("click",(e)=>{this.onCanvasClick(e)});
	}

	draw(){
		if(this.canDraw()){
			for(var i = 0;i<this.layers.length;i++){
				this.layers[i].draw();
			};
		}		
	}

	canDraw(){
		var canDraw = true;
		for(var i =0; i < this.layers.length;i++){
			if(!this.layers[i].isInitialized()){
				console.log('can not draw yet..');
				canDraw = false;
			}
		}
		return canDraw;
	}
	
	setCurrentTool(z){
		this.currentTool = z;
	}

	onCanvasClick(event){
		if(this.currentTool != null){
			console.log('Canvas clicked');
			event.preventDefault();
			this.layers[0].setZone(event.x,event.y,this.currentTool);
		}
	}
}