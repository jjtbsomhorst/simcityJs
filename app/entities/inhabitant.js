"use strict"

class Inhabitatant{

    constructor(){
        this.home = null;
        this.work = null;
    }

    setWork(zone){
        if(zone instanceof Industrial || zone instanceof Commercial){
            this.work = zone;
        }
    }

    setHome(zone){
        if(zone instanceof Residential){
            this.home = zone;
        }
    }


}