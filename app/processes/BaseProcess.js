"use strict"

class BaseProcess{

    constructor(game){
        this.game = game;
        this.busy = false;
        this.queueu = [];
    }

    tick(){
        if(!this.busy && this.queueu.length >= 0  ){ // not busy and got queue
            this.busy = true;
            this.busy = false;   
        }
    }

    sendMessage(type,value){
        
    }

}