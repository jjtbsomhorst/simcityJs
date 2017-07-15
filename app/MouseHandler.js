"use strict"

class GridMouseHandler{

    constructor(game,grid){
        this.grid = grid;
        this.grid.container.addEventListener('click',(e)=>{this.onCanvasClick(e)});
        this.grid.container.addEventListener('contextmenu',(e)=>{this.onCanvasRightClick(e)});
        this.grid.container.addEventListener('onmousemove',(e)=>{this.onMouseMove(e)});
        this.grid.container.addEventListener('onmouseup',(e)=>{this.onMouseUp(e)});
        this.grid.container.addEventListener('onmousedown',(e)=>{this.onMouseDown(e)});
        this.isDragging = false;
    }

    onCanvasClick(e){
        //e.preventDefault();       
        this.handleClick(e);
    }

    onCanvasRightClick(e){
        console.log("right click");
        e.preventDefault();
        this.grid.setCurrentTool(null);
        handleClick(e);
    }

    onMouseMove(e){
        e.preventDefault();
    }

    onMouseUp(e){
        e.preventDefault();
        console.log('mouse up')
    }
    onMouseDown(e){
        e.preventDefault();
        console.log('mouse down');
    }

    handleClick(event){
        let coords = this.grid.getCoordinates(event.x,event.y);
		let newZone = ZoneLoader.getZoneObject(this.grid.currentTool,coords[0],coords[1]);
		let currentZones = this.grid.getZones(coords);
        this.grid.setZone(coords,newZone);
		
    }



}