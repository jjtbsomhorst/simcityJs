"use strict"
class UtilToolbar extends Toolbar{

	constructor(grid){
		super();
		this.grid = grid;
		this.currentButton = null;
	}

	draw(){
		super.draw();
		
		let imgutils = "assets/util_buttons.png";
		this.generateButton('budget',imgutils,"0px","0px",this.menubarNode);
		this.generateButton('TileInfo',imgutils,"-16px","0px",this.menubarNode);

		
		this.menubarNode.style.width = (this.buttons*16)+"px";
    }
    
	
	onBtnClick(event){
		
		event.preventDefault();
		this.grid.sendMessage("UtilButtonClicked",event.target.id);
	}
}
