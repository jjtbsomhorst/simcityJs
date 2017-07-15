"use strict"
class EffectsLayer extends Layer{

	constructor(grid){
		super(grid);
		this.state = false;
		this.isDrawing = false;
		this.tickscount = 0;
		this.cache = new Map();
		this.fillCache();
		this.layers = [];
		this.layers.push(this.grid.layers.get('Power'));
		this.layers.push(this.grid.layers.get('Zones'));
	}

	fillCache(){
		this.cache.set("Electra",new Tile("assets/effects.png",16,16,16,0));
		this.cache.set("Water", new Tile("assets/effects.png",16,16,0,0));
	}

	getTile(name){
		return this.cache.get(name);
	}

	acceptZone(coordinates,zone,previousZones){
		return false;
	}

	redrawForLayer(data){
		data.forEach((row)=>{
			row.forEach((entry)=>{
				let zone = entry.z;
				if(this.state){
				if(zone instanceof DemandingZone && zone.needsPower() && !zone.isPowered()){
					let t = this.getTile("Electra");
					Layer.drawZone(this.grid,t,this.context,entry.x,entry.y);
				}
				}
			});
		});
	}

	redraw(){
		if(!this.isDrawing){
			
			this.onTic();
			
				this.isDirty = true;
				super.redraw();
				if(this.state){
					this.isDrawing = true;
					this.layers.forEach((l)=>{
						this.redrawForLayer(l.data);
					});
				}
				this.state = !this.state;
				this.isDirty = false;
				this.isDrawing = false;
				
			
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