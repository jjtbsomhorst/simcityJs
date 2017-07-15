"use strict"
class StaticLayer extends TileLayer{

	constructor(grid,tile){
		super(grid);
		this.tile = tile;
        super.setDrawableZones([])
		this.generated = false;
	}

	set zone(z){
		this.staticZone = z;
	}
	
	redraw(){
		
		
		if(this.isDirty && !this.generated){
			super.redraw();

			
			for(var i = 0 ; i < this.columnCount;i++){
				for(var j = 0;j<this.rowCount;j++){
                    Layer.drawZone(this.grid,this.tile.getSprite(),this.context,i,j);
				}
			}
			this.isDirty = false;
			this.generated = true;
		}
		
	}

	get class(){
		return "StaticTileLayer";
	}
}