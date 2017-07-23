"use strict"
class Grid{

	constructor(r,c,w,h,container,game){
		
		this.columns = c;
		this.rows = r;
		this.layers = new Map();
		this.currentTool = null;
		this.container = container;
		this.height = h;
		this.width = w;
		this.game = game;
		this.initLayers();
		this.initData();
	}

	initData(){
		
	}

	needsRedraw(){
		this.isDirty = true;
	}

	getLayer(name){
		if(this.layers.has(name)){
			return this.layers.get(name);
		}
		return null;
	}
	initLayers(){
		this.layers.set('Static',new StaticLayer(this,ZoneLoader.getZoneObject("Soil",-1,-1)));
		this.layers.set('Road',new RoadGrid(this));
		this.layers.set('Power',new PowerGrid(this));
		this.layers.set('Zones',new ZonesLayer(this));
		this.layers.set('Effects',new EffectsLayer(this));
		
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

		this.layers.forEach((layer)=>{
			layer.redraw();
		});
	}
	
	setCurrentTool(z){
		this.currentTool = z;
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

	getSurroundingZones(xCoordinate,yCoordinate){
		
		var surroundings = [];
		surroundings[0] = null; // top
		surroundings[1] = null; // left
		surroundings[2] = null; // right
		surroundings[3] = null; // bottom

		for(var i = 0; i < surroundings.length;i++){
			let x = xCoordinate;
			let y = yCoordinate;
			switch(i){
				case 0:
					y = yCoordinate-1;
				break;

				case 1:
					x = xCoordinate-1;
				break;
				case 2:
					x = xCoordinate+1;
				break;
				case 3:
					y = yCoordinate+1;
				break;
			}

			let coords = [x,y];
			surroundings[i] = this.getZones(coords);
			
		}
		return surroundings;
	}


	setZone(coords,newZone){
	
		let currentZones = this.getZones(coords);
		let zoneIsSet = false;
		this.layers.forEach((layer)=>{
			if(layer.setZone(coords,newZone,currentZones)){
				zoneIsSet = true;
			}
		});
		if(zoneIsSet){
			this.game.sendMessage('setzone',newZone);
		}
		
	}

	sendMessage(msg, value){
		this.layers.forEach((layer)=>{
			layer.sendMessage(msg,value);
		});
	}


	getZones(coords,skipNull){
		let zones = [];
		this.layers.forEach((layer)=>{
			try{
				zones.push(layer.getZone(coords).z)
			}catch(e){
				if(!skipNull){
					zones.push(null);
				}
				
			}
		});
		return zones;
	}


}
