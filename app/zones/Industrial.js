"use strict"

class Industrial extends DemandingZone{
	constructor(x,y){
		super("assets/industrial.png",x,y);
		super.class = 'industrialZone';
		this.employees = [];

		this.maxEmployees = Math.floor(Math.random() * 100) + 1 ;

	}

	addEmployee(h){
		if(this.employees.length < this.maxEmployees){
			this.employees.push(h);
		}
	}
	removeEmployee(h){
		if(this.employees.indexOf(h) >= 0){
			this.employees.splice(this.employees.indexOf(h),1);
		}
	}

	getEmployeeCount(){
		return this.employees.length;
	}

	
	getMaxEmployeeCount(){
		return this.maxEmployees;
	}

	getSprite(){
		
		if(this.employees.length > 0){
			if(this.maxEmployees < 50 ){
			this.sprite.offsetX = 16;
			this.sprite.offsetY = 0;
			}else if(this.maxEmployees > 50){
				this.sprite.offsetX = 0;
				this.sprite.offsetY = 16;
			}
		}
		return super.getSprite();
		
	}
	

};