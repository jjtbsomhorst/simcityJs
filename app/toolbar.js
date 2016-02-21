"use strict"
class Toolbar{

	constructor(grid){
		this.grid = grid;
		this.init();
		this.currentButton = null;
	}

	init(){
		var self = this;
		var imgZones = "assets/zone_buttons.png";
		var imgutils = "assets/util_buttons.png";

		this.node = document.getElementById("btnBar");
		this.generateButton("residential",imgZones,"0","-16px",this.node);
		this.generateButton("commercial",imgZones,"-16px","-16px",this.node);
		this.generateButton("industrial",imgZones,"-32px","-16px",this.node);
		this.generateButton("road",imgZones,"-32px","0",this.node);
		this.generateButton("powerpole",imgZones,"-16px","0",this.node);
		this.generateButton("shovel",imgZones,"0","0",this.node);

		this.generateButton("policeDepartment",imgutils,"0","0",this.node);
		this.generateButton("fireDepartment",imgutils,"-16px","0",this.node);
		this.generateButton("powerplant",imgutils,"0","-16px",this.node);
		this.generateButton("park",imgutils,"-16px","-16px",this.node);
		this.generateButton("hospital",imgutils,"-32px","-16px",this.node);
	}

	generateButton(id,img,x,y,parent){
		var btnRes = new Image();
		btnRes.id = id;
		btnRes.style.width = "16px";
		btnRes.style.height= "16px";
		btnRes.style.background = "url('"+img+"') no-repeat "+x+" "+y;
		btnRes.addEventListener("click",(e)=>{this.onBtnClick(e)});
		parent.appendChild(btnRes);
	}

	getCurrentButton(){

	}

	onBtnClick(event){
		event.preventDefault();
		var zoneObject = ZoneLoader.getZoneObject(event.target.id);
		if(zoneObject == null){
			console.error('Zone object could not be determined '.event.target.id);
			return false;
		}

		this.grid.setCurrentTool(zoneObject);

	}
}
