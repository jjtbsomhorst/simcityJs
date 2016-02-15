"use strict"
class Layer{
 
	constructor(c,r,w,h,zone,container){
		this.index = container.childNodes.length+1;
		this.node = document.createElement("canvas");
		this.node.setAttribute("id","layer_"+this.index);
		this.node.setAttribute("height",h);
		this.node.setAttribute("width",w);
		
		this.node.style.position = 'absolute';
		this.node.style.Zindex = this.index;
		this.initialized = false;
		this.offsetX = container.getBoundingClientRect().left;
		this.offsetY = container.getBoundingClientRect().top;
		container.appendChild(this.node);
		var self = this;
		this.node.addEventListener("onload",this.setIsinitialized(),this);
		this.isDirty = true;
		this.data = [];
		this.cols = c;
		this.rows = r;
		this.width = w;
		this.height = h;

		for(var i = 0; i < this.rows;i++){
			var row = [];
			for(var j = 0; j< this.cols;j++){
				row.push(ZoneLoader.getZoneObject(zone));
			}
			this.data.push(row);
		}
	}

	setForeGround(){
		this.node.style.zIndex = 1000;
	}
	setIsinitialized(){
		console.log('init');
		this.initialized = true;
	}

	isInitialized(){
		return this.initialized;
	}

	setZone(x,y,zone){
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

		var currentZone = this.data[col][row];
		debugger;
		if(currentZone.toString() != zone.toString()){
			this.data[col][row] = zone;
			this.isDirty = true;
		}
	}

	draw(){
		if(this.isDirty){
			console.log('redraw, because we are dirty');
			if(this.context == null && this.node != null){
				this.context = this.node.getContext("2d");

			}

			for(var i = 0; i < this.cols;i++){

				var y = i * 16;

				try{
						for(var j = 0; j < this.data[i].length;j	++){
						var x = j * 16;
						var z = this.data[i][j];
						if(z!=null){
							this.context.drawImage(z.getSprite(),x,y);
						}
					}
				}catch(e){}
			}
			this.isDirty = false;
		}
	}
}