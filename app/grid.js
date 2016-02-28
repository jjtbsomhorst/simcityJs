"use strict"
class Grid{

	constructor(r,c,w,h,container){
		
		this.columns = c;
		this.rows = r;
		this.data = [];
		this.layers = [];
		this.grids = [];
		this.currentTool = null;
		this.container = container;
		this.container.addEventListener("click",(e)=>{this.onCanvasClick(e)});
		this.height = h;
		this.width = w;
		this.initLayers();
		this.initData();
	}

	initData(){
		this.data.length = this.rows;
		for(var i = 0; i < this.data.length;i++){
			this.data[i] = [];
			this.data[i].length = this.columns;
		}
	}

	needsRedraw(){
		this.isDirty = true;
	}


	initLayers(){
		this.layers = [];	
		this.layers.push(new StaticLayer(this,ZoneLoader.getZoneObject("soil")));
		this.layers.push(new TileLayer(this));
		this.layers.push(new EffectsLayer(this));
		this.layers.push(new PowerGrid(this));
	}


	get tileWidth(){
		return 16;
	}

	get tileHeight(){
		return 16;
	}

	get offsetX(){
		return this.container.getBoundingClientRect().left;
	}
	get offsetY(){
		return this.container.getBoundingClientRect().top;
	}

	draw(){
		console.log('draw');
		for(var i = 0; i < this.layers.length;i++){
			this.layers[i].redraw();
		}

	}
	
	setCurrentTool(z){
		this.currentTool = z;
	}

	onCanvasClick(event){
		if(this.currentTool != null){
			event.preventDefault();
			var coords = this.getCoordinates(event.x,event.y);
			var currentZone = this.data[coords[1]][coords[0]];

			if(currentZone == null || !(currentZone.getClass() == this.currentTool.getClass())){
				this.data[coords[1]][coords[0]] = this.currentTool;
				for(var i = 0; i < this.layers.length;i++){
					this.layers[i].setZone(coords,this.currentTool);
				}

				for(var i = 0;i < this.grids.length;i++){
					this.grids[i].setZone(coords,this.currentTool);
				}
			}

			

		}
	}

	calculateCoordinate(c,length){
		var row = c;
		if(c < length){
			row = 0;
		}else{
			c = c - (c%this.tileWidth);
			row = c/this.tileWidth;
		}
		return row;
	}

	getCoordinates(x,y){
		var row = 0;
		var col = 0;

		x = x - this.offsetX;
		y = y - this.offsetY;
		col= this.calculateCoordinate(x,this.tileWidth);
		row= this.calculateCoordinate(y,this.tileHeighth);
		
		return [col,row];
	}

	getSurroundingZones(j,i){
		var surroundings = [];
		surroundings[0] = null;
		surroundings[1] = null;
		surroundings[2] = null;
		surroundings[3] = null;
		try{
			surroundings[0] = this.data[i-1][j];
			surroundings[0].x = i-1;
			surroundings[0].y = j;

		}catch(e){}

		try{
			surroundings[3] = this.data[i+1][j];
			surroundings[3].x = i+1;
			surroundings[3].y = j;
		}catch(e){}

		try{
			surroundings[1] = this.data[i][j-1];
			surroundings[1].x = i;
			surroundings[1].y = j-1;
		}catch(e){}
		
		try{
			surroundings[2] = this.data[i][j+1];
			surroundings[2].x = i;
			surroundings[2].y = j+1;
		}catch(e){}
		
		return surroundings;
	}

}

class PowerGrid extends TileLayer{
	constructor(source){
		super(source);
		this.isDirty = false;
	}

	setZone(coordinates,zone){
		if(zone instanceof PowerPlant){
			var surroundings = this.parent.getSurroundingZones(zone.x,zone.y);	
		}
		if(zone instanceof Road){
			super.setZone(coordinates,zone);
		}
	}

	redraw(){
		super.redraw();
	}

	recalc(){
		console.log('Force redraw');
		this.grid.needsRedraw();
	}

}