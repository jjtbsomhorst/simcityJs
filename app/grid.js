"use strict"
class Grid{

	constructor(c,r,w,h,container){
		
		this.columns = c;
		this.rows = r;


		this.gameLayer = new GameLayer(r,c,w,h,"",container);

		this.effectsLayer = new effectsLayer(r,c,w,h,"",container);
		this.zoneLayer = new tileLayer(r,c,w,h,"",container);
		this.soilLayer= new staticTileLayer(r,c,w,h,"soil",container);

		this.zoneLayer.setIndex(1);
		this.effectsLayer.setIndex(2);
		this.soilLayer.setIndex(0);

		this.layers = [];
		this.layers.push(this.gameLayer);
		this.layers.push(this.zoneLayer);
		this.layers.push(this.effectsLayer);
		this.layers.push(this.soilLayer);
		
		this.currentTool = null;
		container.addEventListener("click",(e)=>{this.onCanvasClick(e)});
	}

	
	draw(){

		if(this.canDraw()){

			for(var i = 0; i < this.layers.length;i++){
				this.layers[i].clear();
			}

			for(var rowIndex = 0; rowIndex < this.rows;rowIndex++){
				for(var colIndex = 0; colIndex < this.columns; colIndex++){
					for(var layerIndex = 0; layerIndex < this.layers.length;layerIndex++){
						this.layers[layerIndex].draw(colIndex,rowIndex);
					}
				}
			}
		}		
	}

	canDraw(){
		var canDraw = true;
		for(var i =0; i < this.layers.length;i++){
			if(!this.layers[i].isInitialized()){
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
				
			event.preventDefault();
			this.gameLayer.setZone(event.x,event.y,this.currentTool);
			for(var i=0;i<this.layers.length;i++){
				this.layers[i].setZone(event.x,event.y,this.currentTool);
			}
		}
	}
}