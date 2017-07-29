"use strict"

class TileLayer extends Layer{

	constructor(grid){
		super(grid);
		this.dirtyZones = new Map();
		
	}

	getZones(){
		return this.data;
	}

	getZone(coordinates){
		if(!this.data.has(coordinates[0])){
			this.data.set(coordinates[0],new Map());
		}
		return this.data.get(coordinates[0]).get(coordinates[1]);
	}

	redraw(){
		
		if(this.isDirty){
			super.redraw();			
			this.data.forEach((row)=>{
				row.forEach((entry)=>{
					
					try{
						if(entry != null && this.drawableZones.indexOf(entry.z.constructor.name) >= 0){
						let zone = entry;
						let surroundings = this.grid.getSurroundingZones(zone.x,zone.y);
						let sprite = zone.z.getSprite(surroundings);
						Layer.drawZone(this.grid,sprite,this.context,zone.x,zone.y);
					}
					}catch(e){
						console.error(e);
					}
				});
			});
			this.isDirty = false;
		}
	}

	get class(){
		return "TiledLayer";
	}

}