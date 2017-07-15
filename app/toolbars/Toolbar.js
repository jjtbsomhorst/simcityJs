"use strict"
class Toolbar extends MenuBar{

	constructor(grid){
		super();
		this.grid = grid;
		this.currentButton = null;
	}

	draw(){
		super.draw();
		let imgZones = "assets/zone_buttons.png";
		let imgutils = "assets/util_buttons.png";
		this.generateButton("residential",imgZones,"0","-16px",this.menubarNode);
		this.generateButton("commercial",imgZones,"-16px","-16px",this.menubarNode);
		this.generateButton("industrial",imgZones,"-32px","-16px",this.menubarNode);
		this.generateButton("road",imgZones,"-32px","0",this.menubarNode);
		this.generateButton("PowerLine",imgZones,"-16px","0",this.menubarNode);
		this.generateButton("shovel",imgZones,"0","0",this.menubarNode);

		this.generateButton("policeDepartment",imgutils,"0","0",this.menubarNode);
		this.generateButton("fireDepartment",imgutils,"-16px","0",this.menubarNode);
		this.generateButton("powerplant",imgutils,"0","-16px",this.menubarNode);
		this.generateButton("park",imgutils,"-16px","-16px",this.menubarNode);
		this.generateButton("hospital",imgutils,"-32px","-16px",this.menubarNode);
		this.menubarNode.style.width = "176px";
		
		
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
	
	onBtnClick(event){
		console.log(event);
		event.preventDefault();
		this.grid.setCurrentTool(event.target.id);
	}
}
