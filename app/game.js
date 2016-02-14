"use strict"
class game{
	constructor(id){
		this.id = id;
		this.init = false;
		this.node = document.getElementById(this.id);
		window.onload = this.onLoad(event);

	}

	onLoad(event){
		this.initToolbar();
		this.initCanvas();
	}

	initCanvas(){
		var self = this;
		if(!this.init){
			console.log('load stuff');
			
			this.height = this.node.getAttribute("height");
			this.width = this.node.getAttribute("width");
			this.grid = new Grid(this.height/16,this.width/16,this.width,this.height,this.node);
			this.node.addEventListener("click",self.onCanvasClick);
			window.setInterval(function(){
				self.draw();
			},100);	
		}
	}

	initToolbar(){
		var self = this;
		this.btnBar = document.getElementById("btnBar");
		var btnRes = document.createElement('img');
		btnRes.src = "assets/residential.png";
		btnRes.id = "residential";
		btnRes.addEventListener("click",self.onBtnClick);
		this.btnBar.appendChild(btnRes);

		var btnRes = document.createElement('img');
		btnRes.src = "assets/commercial.png";
		btnRes.id = "commercial";
		btnRes.addEventListener("click",self.onBtnClick);
		this.btnBar.appendChild(btnRes);

		var btnRes = document.createElement('img');
		btnRes.src = "assets/industrial.png";
		btnRes.id = "industrial";
		btnRes.addEventListener("click",self.onBtnClick);
		this.btnBar.appendChild(btnRes);
		
	}

	onBtnClick(){
		console.log('clickerdieclick!')
		event.preventDefault();
		this.selectedZone = event.target.id;
	}

	onCanvasClick(){
		event.preventDefault();
		
		console.log('canvas clicked');
	}

	draw(){
		this.grid.draw();

	}
}
class Grid{

	constructor(c,r,w,h,container){
		
		this.layers = [];
		
		this.layers.push(new Layer(r,c,w,h,"",container));
		this.layers.push(new Layer(r,c,w,h,"soil",container));
	}

	draw(){
		if(this.canDraw()){
			for(var i = 0;i<this.layers.length;i++){
				this.layers[i].draw();
			};
		}		
	}

	canDraw(){
		var canDraw = true;
		for(var i =0; i < this.layers.length;i++){
			if(!this.layers[i].isInitialized()){
				console.log('can not draw yet..');
				canDraw = false;
			}
		}
		return canDraw;
	}
}

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

		container.appendChild(this.node);
		var self = this;
		this.node.addEventListener("onload",this.setIsinitialized(),this);
		if(zone != ""){
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
	}
	setIsinitialized(){
		console.log('init');
		this.initialized = true;
	}

	isInitialized(){
		return this.initialized;
	}

	draw(){
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
	}

	getObject(z){
		
	}
}

class ZoneLoader{

	static getZoneObject(z){
		if(this.cache == null){
			this.cache = new Map();
		}

		if(this.cache.get(z)== null){
			var o = null;
			switch(z){
			case "soil":
				o=  new soil();break;
			case "residential":
				o= new residential();break;
			case "industrial":
				o= new industrial();break;
			case "commercial":
				o= new commercial();break;
			default:
				o= null;
				break;
			
			}
			this.cache.set(z,o);
		}
		return this.cache.get(z);
	}


}

class Zone{
	constructor(source){
		this.sprite = new Image();
		this.sprite.src = source;
		this.sprite.onload= function(){
			console.log('sprite loaded');
		}
	}

	getSprite(){
		return this.sprite;
	}

};
class residential extends Zone{};
class industrial extends Zone{};
class commercial extends Zone{};
class soil extends Zone{
	constructor(){
		super("assets/soil.png");
	}
};

var g = new game("canvas");