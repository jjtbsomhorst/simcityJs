"use strict"

class BaseProcess{

    constructor(game){
        this.game = game;
        this.busy = false;
    }

    tick(){
        if(!this.busy){
            this.busy = true;
            console.log('base process is ticking');
            this.busy = false;
        }
    }

}