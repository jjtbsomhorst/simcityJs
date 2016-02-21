"use strict"
class GameLayer{
	constructor(c,r,w,h,zone,container){
		this.data = [];
		this.cols = c;
		this.rows = r;
		this.width = w;
		this.height = h;
		this.baseZone = ZoneLoader.getZoneObject(zone);
		this.offsetX = container.getBoundingClientRect().left;
		this.offsetY = container.getBoundingClientRect().top;
		this.initialized = true;
		for(var i = 0; i < this.rows;i++){
			var row = [];
			for(var j = 0; j< this.cols;j++){
				row.push(this.baseZone);
			}
			this.data.push(row);
		}
	}

	setIsinitialized(){
		this.initialized = true;
	}

	isInitialized(){
		return this.initialized;
	}

	static getSurroundingZones(data,i,j){
		var surroundings = [null,null,null,null];

		try{
			surroundings[0] = data[i-1][j];
		}catch(e){}

		try{
			surroundings[3] = data[i+1][j];
		}catch(e){}

		try{
			surroundings[1] = data[i][j-1];
		}catch(e){}
		
		try{
			surroundings[2] = data[i][j+1];
		}catch(e){}
		
		return surroundings;
	}

	setZone(x,y,zone){
		var coordinates = this.getCoordinates(x,y);
		zone.x = coordinates[0];
		zone.y = coordinates[1];
		var currentZone = this.data[coordinates[1]][coordinates[0]];		
		if(currentZone.toString() != zone.toString()){
			this.data[coordinates[1]][coordinates[0]] = zone;
			if(currentZone instanceof PowerPlant && !(zone instanceof PowerPlant)){

				this.disablePower(GameLayer.getSurroundingZones(this.data,currentZone.x,currentZone.y));
			}
		}
	}	

	disablePower(zones){
		if(zones != null){
			for(var i = 0; i < zones.length;i++){
				if(zones[i] != null){
					if(zones[i] instanceof DemandingZone){
						if(zones[i].isPowered()){
							zones[i].setPowered(false);
							this.disablePower(GameLayer.getSurroundingZones(this.data,zones[i].x,zones[i].y));
						}
						
					}					
				}
				
			}
		}
	}

	getCoordinates(x,y){
		var row = 0;
		var col = 0;

		x = x - this.offsetX;
		y = y - this.offsetY;

		if(x < 16){
			row = 0;
		}else{
			x = x - (x%16);
			row = x/16
			
		}

		if( y < 16 ){
			col = 0;
		}else{
			y = y - (y%16);
			col = y / 16;
			col--
		}
		return [row,col];
	}	

	draw(r,c){
		var surroundings = GameLayer.getSurroundingZones(this.data,r,c);
		var zone = this.data[r][c];

		if(zone instanceof PowerPlant){
			//this.enablePower()
		}

		if(this.containsPoweredZones(surroundings)){
			zone.setPowered(true);
		}

	}

	containsPoweredZones(data){
		var foundPower = false;

		for(var i = 0; i < data.length;i++){
			if(data[i] != null && data[i].isPowered()){
				foundPower = true;
				break;
			}
		}
		return foundPower;

	}
	clear(){}
}

class Layer extends GameLayer{
 
	constructor(c,r,w,h,zone,container){
		super(c,r,w,h,zone,container);
		this.index = container.childNodes.length+1;
		this.node = document.createElement("canvas");
		this.node.setAttribute("id","layer_"+this.index);
		this.node.setAttribute("height",h);
		this.node.setAttribute("width",w);
		
		this.node.style.position = 'absolute';
		this.node.style.Zindex = this.index;
		this.initialized = false;
		container.appendChild(this.node);
		var self = this;
		this.node.addEventListener("onload",this.setIsinitialized(),this);
		this.isDirty = true;
	}

	setIndex(index){
		this.node.style.zIndex = index;
	}



	getZone(x,y){
		var coords = this.getCoordinates(x,y);
		return this.data[coords[1]][coords[0]];
	}

	setZone(x,y,zone){

	}

	clear(){
		if( typeof(this.context) != "undefined"){
			this.context.clearRect(0,0,this.width,this.height);
		}
	}

	draw(r,c){
		if(typeof(this.context) == 'undefined'){
			this.context = this.node.getContext('2d');
		}
		
	}

	toString(){
		return 'baseLayer';
	}
}

class tileLayer extends Layer{

	constructor(c,r,w,h,zone,container){
		super(c,r,w,h,zone,container);
		this.node.setAttribute("id","tileLayer");
	}
	toString(){
		return 'tileLayer';
	}

	setZone(x,y,zone){
		var coordinates = this.getCoordinates(x,y);
		var currentZone = this.data[coordinates[1]][coordinates[0]];		
		if(currentZone.toString() != zone.toString()){
			this.data[coordinates[1]][coordinates[0]] = zone;
			this.isDirty = true;
		}
	}
	draw(r,c){
		super.draw();
		if( typeof(this.context) != "undefined"){
			
			var x = r*16;
			var y = c*16;
			var surroundings = Layer.getSurroundingZones(this.data,r,c);
			
			try{
				var z = this.data[r][c];
				z.draw(this.context,y,x,surroundings,c,r);
			}catch(e){
			}
		}
	}

}

class staticTileLayer extends tileLayer{
	constructor(c,r,w,h,zone,container){
		super(c,r,w,h,zone,container);
		this.dirty = true;
	}
	setZone(x,y,zone){} // do nothing

	clear(){
		if(this.dirty){
			super.clear();
		}
	}
	draw(r,c){
		if(this.dirty){
			super.draw(r,c);		
			if(r+1 >= this.rows && c+1 >= this.cols){
			this.dirty = false;
			}
		}

	}
}

class effectsLayer extends tileLayer{


	constructor(c,r,w,h,zone,container){
		super(c,r,w,h,zone,container);
		this.node.setAttribute("id","effectsLayer");
		this.cache = new Map();
		this.loadTiles();
		
	}

	draw(r,c){
		super.draw(r,c);
		try{
			var z = this.data[r][c];
			var tile = null;
			if(z.needsPower() && !z.isPowered()){
				tile = this.cache.get("Electra");
			}
			else if(z.needsWater()){
				tile = this.cache.get("Water");	
			}
			if(tile != null){
				tile.draw(this.context, r*16,c*16);
			}
		}catch(e){
			console.log(e);
		}
	}

	toString(){
		return 'effectsLayer';
	}

	loadTiles(){
		this.cache.set("Electra",new Tile("Electra","assets/effects.png",16,16,16,0));
		this.cache.set("Water", new Tile( "Water"  ,"assets/effects.png",16,16,0,0));
	}


	getTile(type){
		return cache.get(type);
	}
}

class Tile{
	constructor(name,imgSrc,w,h,offsetX, offsetY){
		this.image = new Image();
		this.image.src = imgSrc;
		this.name = name;
		this.width = w;
		this.height = h;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}

	getSprite(){
		return this.image;
	}

	draw(context,y,x){

		context.drawImage(this.getSprite(),this.offsetX,this.offsetY,this.width,this.height,x,y,this.width,this.height);
	}
}