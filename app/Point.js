"use strict";
class Point{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.id = ""+this.x+"%"+this.y;
		this.heuristicCost = 0;
		this.destination = null;
	}

	setDestination(d){
		this.destination = d;
	}

	setParent(p){
		this.parent = p;
	}

	getParent(){
		return this.parent;
	}

	getX(){
		return this.x;
	}
	getY(){
		return this.y;
	}

	getHash(){
		return this.id;
	}

	getMovementCost(){
		if(this.parent== null){
			return 0;
		}
		return this.parent.getMovementCost()+10; // we dont have diagonal stuff
	}

	getCosts(){
		return this.getHeuristicCost() + this.getMovementCost
	}

	getHeuristicCost(){
		let heuristicCost = 99999;
		if(this.destination != null){
			heuristicCost = 0;
			if(this.getX() <this.destination.getX()){
				heuristicCost += (this.destination.getX() - this.getX()) * 10
			}else{
				heuristicCost += (this.getX() - this.destination.getX()) * 10
			}

			if(this.getY() <this.destination.getY()){
				heuristicCost += (this.destination.getY() - this.getY()) * 10
			}else{
				heuristicCost += (this.getY() - this.destination.getY()) * 10
			}
		}
       

        return heuristicCost;
	}
}