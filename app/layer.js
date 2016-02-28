"use strict"

class Layer{

	constructor(grid){
		this.grid = grid;
		this.rowCount = grid.rows;
		this.columnCount = grid.columns;
		this.node = document.createElement("canvas");
		this.grid = grid;
		var index = grid.container.childNodes.length+1;

		this.node.setAttribute("id","layer_"+index+"_"+this.class);
		this.node.setAttribute("height",grid.height);
		this.node.setAttribute("width",grid.width);
		this.node.style.position = 'absolute';
		this.node.style.zIndex = index;
		this.grid.container.appendChild(this.node);
		this.isDirty = true;
	}

	setDirty(){
		this.isDirty = true;
	}

	setIsinitialized(){
		console.log('Layer initialized');
		this.initialized = true;
		this.ctx = this.node.getContext('2d');
	}

	redraw(){
		if(this.isDirty){
			this.context.clearRect(0,0,this.grid.width,this.grid.height);
		}
	}
	setZone(coordinates,zone){
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

class TileLayer extends Layer{

	constructor(grid){
		super(grid);
		this.dirtyZones = [];
	}

	setZone(coords,zone){

		for(var i = 0;i < this.dirtyZones.length;i++){
			var currentZone = this.dirtyZones[i];
			var currentZoneX = currentZone.x;
			var currentZoneY = currentZone.y;
			var currentZoneClass = currentZone.z.getClass();
			if(currentZone.x == coords[0] && currentZone.y == coords[1]){
				this.isDirty = true;
				this.dirtyZones[i].z = zone;
				return;
			}
		}

		this.dirtyZones.push({
				z: zone,
				x :coords[0],
				y :coords[1]
			});
		this.isDirty = true;

		
	}

	redraw(){
		
		if(this.isDirty){
			super.redraw();
			for(var i= 0; i < this.dirtyZones.length;i++){
				var zone = this.dirtyZones[i];
				var surroundings = this.grid.getSurroundingZones(zone.x,zone.y);
				var sprite = zone.z.getSprite(surroundings);
				Layer.drawZone(this.grid,sprite,this.context,zone.x,zone.y);
			}
			this.isDirty = false;
		}
	}

	get class(){
		return "TiledLayer";
	}

}

class StaticLayer extends TileLayer{

	constructor(grid,tile){
		super(grid);
		this.tile = tile;
	}

	set zone(z){
		this.staticZone = z;
	}

	redraw(){
		
		if(this.isDirty){
			super.redraw();
			console.log('StaticLayer redraw');
			
			for(var i = 0 ; i < this.columnCount;i++){
				for(var j = 0;j<this.rowCount;j++){
					Layer.drawZone(this.grid,this.tile.getSprite(),this.context,i,j);
				}
			}
			this.isDirty = false;
		}
	}

	get class(){
		return "StaticTileLayer";
	}

	setZone(coords,zone){}
}

class EffectsLayer extends TileLayer{

	constructor(grid){
		super(grid);
		this.state = false;
		this.tickscount = 0;
		this.cache = new Map();
		this.fillCache();
	}

	fillCache(){
		this.cache.set("Electra",new Tile("assets/effects.png",16,16,16,0));
		this.cache.set("Water", new Tile("assets/effects.png",16,16,0,0));
	}

	getTile(name){
		return this.cache.get(name);
	}

	redraw(){
		if(this.dirtyZones.length > 0){

			this.onTic();
			if(this.isDirty && this.dirtyZones.length > 0){
				super.redraw();
				if(this.state){
					for(var i = 0; i < this.dirtyZones.length;i++){
						var z = this.dirtyZones[i];
						var zone = z.z;
						if(zone instanceof DemandingZone && zone.needsPower() && !zone.isPowered()){
							if(this.state){
								var t = this.getTile("Electra");
								Layer.drawZone(this.grid,t,this.context,z.x,z.y);
							}
						}
					}
				}
				this.state = !this.state;
				this.isDirty = false;
			}
		}
	}
	setZone(coords,zone){
		if(zone instanceof DemandingZone){
			super.setZone(coords,zone);
		}
	}
	onTic(){
		this.tickscount++;
		if(this.tickscount%2 == 0){
			this.tickscount = 0;
			this.isDirty =true;
		}
	}


}