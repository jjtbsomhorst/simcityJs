"use strict"
class game{
	constructor(id){
		this.id = id;
		this.init = false;
		this.node = document.getElementById(this.id);
		this.offsetX = this.node.getClientRects()[0].left;
		this.offsetY = this.node.getClientRects()[0].top;
		window.onload = this.onLoad(event);
		this.frameCount = 0;
		this.maxFrameCount = 15;
	}

	onLoad(event){
		this.initCanvas();
		this.initProcesss();

	}

	initCanvas(){
		
		if(!this.init){

			this.height = this.node.getAttribute("height");
			this.width = this.node.getAttribute("width");
			this.grid = new Grid(this.height/16,this.width/16,this.width,this.height,this.node,this);
			this.menubar = new MenuBar(this.grid);
			this.menubar.addMenuBar(new ZoneToolbar(this.grid));
			this.menubar.addMenuBar(new UtilToolbar(this.grid));
			this.menubar.addMenuBar(new FundsBar(this.grid));
			this.menubar.addMenuBar(new InhabitantBar(this.grid));
			this.menubar.setContainer("btnBar");
			
			this.mouseHandler = new GridMouseHandler(this,this.grid);
			this.init = true;
			this.draw();
			this.menubar.draw();
		}
	}

	getProcess(n){
		return this.processes.get(n);
	}


	initProcesss(){
		this.processes = new Map();
		this.processes.set('FundsProcess',new FundsProcess(this));
		this.processes.set('InhabitantProcess',new InhabitantProcess(this));
		this.startProcesses();
	}

	startProcesses(){
		setInterval((event)=>{
			this.processes.forEach((p)=>{
				p.tick();
			})
		},250);
	}

	draw(){
		if(this.canDraw()){
			this.grid.draw(this.onDrawComplete);
			
		}
		window.requestAnimationFrame(this.draw.bind(this));

	}

	canDraw(){
		this.frameCount++;
		if(this.frameCount == this.maxFrameCount){
			this.frameCount = 0;
		}

		return (this.frameCount == 0);
	}

	sendMessage(type,value){
		this.menubar.sendMessage(type,value);
		this.processes.forEach((p)=>{
			p.sendMessage(type,value);
		})
		this.grid.sendMessage(type,value);
	}
		
}


