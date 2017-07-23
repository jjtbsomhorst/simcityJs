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
        this.travelers = [];
        this.employees = [];
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
                        let pf = new PathFinder(h.home,h.work,this.game.grid);
                        let path = pf.getPath();
                        if(path!=null){
                            let employee = {};
                            employee.path = path;
                            employee.index = 0;
                            employee.endPoint = wZone;
                            employee.inhabitant = h;
                            this.employees.push(employee);
                        }
                    }else{
                        this.workless.push(h);
                    }
                }
            });

            if(this.outsideconnections.size > 0 ){ //
                let inhabitant = new Inhabitant();


                let zone = this.getFreeResidentialZone();
                

                if(zone != null){
                    let inhabitant = new Inhabitant();
                    inhabitant.home = zone;
                    this.inhabitants.push(inhabitant);

                    let key = this.outsideconnections.keys().next().value;

                    let startingpoint = this.outsideconnections.get(key);
                    let destination = zone;
                    let pf = new PathFinder(startingpoint,destination,this.game.grid);
                    let path = pf.getPath();
                    

                    if(path != null && path.length > 0){ // if we have a path and the path isn't emtpy
                        let traveler = {};
                        traveler.path = path;
                        traveler.index = 0;
                        traveler.endPoint = destination;
                        traveler.inhabitant = inhabitant;
                        this.travelers.push(traveler);
                    }                    
                }

            }




            this.travelers.forEach((traveler,index)=>{
                if(traveler.index < traveler.path.length-1){
                    traveler.index = traveler.index+1;
                    let currentPoint= traveler.path[traveler.index];
                    
                }else{
                    traveler.endPoint.addInhabitant(traveler.inhabitant);
                    this.workless.push(traveler.inhabitant);
                    this.game.sendMessage("newcitizen",this.inhabitants.length);
                    this.travelers.splice(index,1);
                }

            });

            this.employees.forEach((employee,index)=>{
                if(employee.index < employee.path.length-1){
                    employee.index = employee.index+1;
                    let currentPoint= employee.path[employee.index];
                    
                }else{
                    employee.endPoint.addEmployee(employee.inhabitant);
                    this.game.sendMessage("newemployee",this.inhabitants.length);
                    this.employees.splice(index,1);
                }
            });

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