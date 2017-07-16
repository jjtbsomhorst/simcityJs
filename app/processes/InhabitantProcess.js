"use strict"

class InhabitantProcess extends BaseProcess{

    constructor(game){
        super(game);
        this.inhabitants = [];
        this.outsideconnections = new Map();
        this.residentials = new Map();
        this.commercials = new Map();
        this.industrials = new Map();
        this.rows =this.game.grid.rows;
        this.cols = this.game.grid.columns;

    }


    tick(){
        if(!this.busy && this.queueu.length >= 0  ){ // not busy and got queue
            this.busy = true;
            // check if there is a outside connection
            // if there is a connection
            //   spawn a inhabitant
            //   get residential zones that are uninhabitad
            //      pick one and add habitant to it
            //      
            if(this.outsideconnections.size > 0){
                
            }


            this.busy = false;   
        }
    }

    sendMessage(type,value){
        switch(type){
            case 'setzone':
                var key = value.x+"|"+value.y;
                if(value instanceof Road){
                    if(value.x == 0 || value.x == this.cols-1){

                        if(value.y == 0 || value.y == this.rows-1){
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
                    this.industrials.set(key,value);
                }
                if(value instanceof Commercial){
                    this.commercials.set(key,value);
                }
            break;
            
        }
    }

}