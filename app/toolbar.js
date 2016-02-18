"use strict"
class Toolbar{

	constructor(grid){
		this.grid = grid;
		this.init();
		this.currentButton = null;
	}

	init(){
		var self = this;

		this.node = document.getElementById("btnBar");
		var btnRes = document.createElement('img');
		btnRes.src = "assets/residential.png";
		btnRes.id = "residential";
		btnRes.addEventListener("click",(e)=>{this.onBtnClick(e)});
		this.node.appendChild(btnRes);

		var btnRes = document.createElement('img');
		btnRes.src = "assets/commercial.png";
		btnRes.id = "commercial";
		btnRes.addEventListener("click",(e)=>{this.onBtnClick(e)});
		this.node.appendChild(btnRes);

		var btnRes = document.createElement('img');
		btnRes.src = "assets/industrial.png";
		btnRes.id = "industrial";
		btnRes.addEventListener("click",(e)=>{this.onBtnClick(e)});
		this.node.appendChild(btnRes);

		var btnRes = document.createElement('img');
		//btnRes.src = "assets/road_normal.png";
		btnRes.id = "road";
		btnRes.className = "road";
		btnRes.addEventListener("click",(e)=>{this.onBtnClick(e)});
		this.node.appendChild(btnRes);
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
