"use strict"
class Toolbar extends MenuBar{

	constructor(grid){
		super();
		this.grid = grid;
		this.currentButton = null;
		this.buttons = [];
	}

    generateButton(id,img,x,y,parent){
		var btnRes = new Image();
		btnRes.id = id;
		btnRes.style.width = "16px";
		btnRes.style.height= "16px";
		btnRes.style.background = "url('"+img+"') no-repeat "+x+" "+y;
		btnRes.addEventListener("click",(e)=>{this.onBtnClick(e)});
		parent.appendChild(btnRes);
		this.buttons.push(btnRes);
	}
	
	onBtnClick(event){
		
		event.preventDefault();
		this.grid.setCurrentTool(event.target.id);
	}
}
