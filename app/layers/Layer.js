"use strict"
/*
	All layers keep track of their own tiles. This way every layer is responsible for
	drawing its own tiles. Also because of this various z-indexes are possible without using the 3d context
 */
class Layer{

	constructor(grid){
		this.grid = grid;
		this.rowCount = grid.rows;
		this.columnCount = grid.columns;
		this.node = document.createElement("canvas");
		this.grid = grid;
		var index = grid.container.childNodes.length+1;

		this.node.setAttribute("id","layer_"+index+"_"+this.constructor.name);
		this.node.setAttribute("height",grid.height);
		this.node.setAttribute("width",grid.width);
		this.node.style.display = 'block';
		this.node.style.position = 'absolute';
		this.node.style.zIndex = index;
		this.grid.container.appendChild(this.node);
		this.isDirty = true;
		this.data = new Map();
		this.drawableZones = ZoneLoader.getZoneTypes();
	}
	
	sendMessage(type,value){
        
    }
	
	setDrawableZones(zones){
		this.drawableZones = zones;
	}

	removeDrawableZones(zones){
		let newDrawableZones = [];
		this.drawableZones.forEach((entry)=>{
			if(zones.indexOf(entry) == -1){
				newDrawableZones.push(entry);
			}
		});
		this.drawableZones = newDrawableZones;
	}

	setDirty(){
		this.isDirty = true;
	}

	setIsinitialized(){
		this.initialized = true;
		this.ctx = this.node.getContext('2d');
	}

	redraw(){

		if(this.isDirty){
			this.context.clearRect(0,0,this.grid.width,this.grid.height);
		}

	}

	acceptZone(coordinates,zone,previousZones){
		return (this.drawableZones.indexOf(zone.constructor.name) >= 0);
	}

	setZone(coordinates,zone,previousZones){
		if(!this.data.has(coordinates[0])){
				this.data.set(coordinates[0],new Map());
		}

		if(this.acceptZone(coordinates,zone,previousZones)){
			var currentZone = this.data.get(coordinates[0]).get(coordinates[1]);
			if(currentZone == null || (currentZone.z.getClass() != zone.getClass())){
				this.data.get(coordinates[0]).set(coordinates[1],{z: zone, x:coordinates[0],y:coordinates[1]});
				this.isDirty = true;

			}
			
		}else if(zone.constructor.name == 'Soil'){
			this.data.get(coordinates[0]).delete(coordinates[1]); // its soil -> reset of zones
			this.isDirty= true;
			
		}
		return this.isDirty;
	}



	get context(){
		if(this.ctx == null){
			this.ctx = this.node.getContext('2d');
		}
		return this.ctx;
	}

	get class(){
		return "Layer";
	}

	static drawZone(grid,sprite,context,x,y){
		var coordinates = Layer.getCoordinates(grid,x,y);
		var offsetX = sprite.offsetX;
		var offsetY = sprite.offsetY;
		var height = grid.tileHeight;
		var width = grid.tileWidth;
		var sprite = sprite;
		context.drawImage(sprite.getSprite(),offsetX,offsetY,height,width,coordinates[0],coordinates[1],height,width);
	}

	static getCoordinates(grid,x,y){
		var row = x*grid.tileWidth;
		var col = y*grid.tileHeight;
		return [row,col];
	}


}







