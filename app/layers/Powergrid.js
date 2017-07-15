"use strict"
class PowerGrid extends TileLayer{
	constructor(source){
		super(source);
		this.isDirty = false;
		this.powersources = new Map();
		super.setDrawableZones(['PowerLine','PowerPlant']);
	}

	setZone(coordinates,zone,currentZone){
		
		super.setZone(coordinates,zone,currentZone);
		
		
		if(zone instanceof PowerPlant){
			if(!this.powersources.has(zone.x)){
				this.powersources.set(zone.x,new Map());
			}
			this.powersources.get(zone.x).set(zone.y,zone);
			
		}else if(zone instanceof Soil){
			if(this.powersources.has(zone.x) && this.powersources.get(zone.x).get(zone.y) != null){
				this.powersources.get(zone.x).delete(zone.y);
				if(this.powersources.get(zone.x).size == 0){
					this.powersources.delete(zone.x);
				}
			}
		}
		
		this.togglePower(zone,false);
		this.powersources.forEach((col)=>{
			col.forEach((row)=>{
				if(row!=null){
					this.togglePower(row,true);
				}
			});
		});
	}
	

	recalc(){
		this.grid.needsRedraw();
	}

	togglePower(zone, power){
		
		if(zone != null){
			
			if(zone instanceof DemandingZone && zone.isPowered() != power){
					zone.setPowered(power);
			}
			var surroundings = this.grid.getSurroundingZones(zone.x,zone.y);
			surroundings.forEach((value)=>{
				
				if(Array.isArray(value)){
					value.forEach((entry)=>{
						if(entry != null && entry instanceof DemandingZone && entry.isPowered() != power){
							this.togglePower(entry,power);
						}
					});
				}

				
			});
		}		
	}
}