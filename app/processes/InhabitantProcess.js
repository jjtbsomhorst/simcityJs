"use strict"

class InhabitantProcess extends BaseProcess{

    constructor(game){
        super(game);
        this.inhabitants = [];
        this.homeless = [];
        this.workless = [];

        this.outsideconnections = new Map();
        this.residentials = new Map();
        this.workplaces = new Map();
        this.rows =this.game.grid.rows;
        this.cols = this.game.grid.columns;

    }


    tick(){
        if(!this.busy){ // not busy and got queue
            this.busy = true;

            // first help the homeless;

            this.homeless.forEach((value)=>{
                let zone = this.getFreeResidentialZone();
                if(zone != null){
                    let h = this.homeless.shift();
                    zone.addInhabitant(h);
                    h.home = zone;
                    this.inhabitants.push(h);
                }
            });
            

            this.workless.forEach((value)=>{
                
                let wZone = this.getFreeWorkzone();
                
                if(wZone != null){
                    let h = this.workless.shift();
                    if(wZone != null){
                        h.work = wZone;
                        wZone.addEmployee(h);
                    }else{
                        this.workless.push(h);
                    }
                }
            });

            if(this.outsideconnections.size > 0){
                let inhabitant = new Inhabitant();


                let zone = this.getFreeResidentialZone();


                if(zone != null){
                    let inhabitant = new Inhabitant();
                    inhabitant.home = zone;
                    this.inhabitants.push(inhabitant);
                    zone.addInhabitant(inhabitant);
                    this.workless.push(inhabitant);
                    this.game.sendMessage("newcitizen",this.inhabitants.length);
                }

            }


            this.busy = false;   
        }
    }



    getFreeWorkzone(){
        let zone = null;
        this.workplaces.forEach((z)=>{
            if(zone == null && z.isPowered() &&  z.getEmployeeCount() < z.getMaxEmployeeCount()){
                zone = z;
            }
        });
        return zone;
    }

    getFreeResidentialZone(){
        let zone = null;
        this.residentials.forEach((z)=>{
            if(zone == null && z.isPowered() &&  z.getInhabitantCount() < z.getMaxInhabitantCount()){
                zone = z;
            }
        });
        return zone;
    }


    sendMessage(type,value){
        switch(type){
            case 'setzone':
                var key = value.x+"|"+value.y;
                if(value instanceof Road){
                    if(value.x == 0 || value.x == this.cols-1){

                        if(value.y == 0 || value.y < this.rows-1){
                            this.outsideconnections.set(key,value);
                            
                        }
                    }
                }
                if(value instanceof Soil){
                    this.outsideconnections.delete(key);               
                }
                if(value instanceof Residential){
                    this.residentials.set(key,value);
                }
                if(value instanceof Industrial){
                    this.workplaces.set(key,value);
                }
                if(value instanceof Commercial){
                    this.workplaces.set(key,value);
                }

                if(value instanceof Soil){
                    this.residentials.delete(key);
                    this.workplaces.delete(key);
                    this.workplaces.delete(key);
                    this.outsideconnections.delete(key);

                    this.inhabitants.forEach((h)=>{
                        if(h.home != null && (h.home.x == value.x && h.home.y == value.y)){
                            h.home.removeInhabitant(h);
                            h.home = null;
                            this.homeless.push(h);
                            
                        }

                        if(h.work != null && (h.work.x == value.x && h.work.y == value.y)){
                            h.work.removeEmployee(h);
                            h.work = null;
                            this.workless.push(h);
                        }

                    });
                }
            break;
            

        }
    }

}