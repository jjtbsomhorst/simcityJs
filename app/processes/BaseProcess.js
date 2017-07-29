"use strict"

class BaseProcess{

    constructor(game){
        this.game = game;
        this.busy = false;
        this.queueu = [];
        this.ticks = 0;
        this.waitTicks = 0;
    }

    tick(zonedata){
        // if(!this.busy && this.queueu.length >= 0  ){ // not busy and got queue
        //     this.busy = true;
        //     this.busy = false;   
        // }
        this.ticks++;
    }

    sendMessage(type,value){
        
    }

}