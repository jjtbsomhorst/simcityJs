"use strict"

class InhabitantProcess extends BaseProcess{

    constructor(game){
        super(game);
        this.inhabitants = [];
    }


    tick(){
        if(!this.busy){
            debugger;
            this.game.grid.getLayer('Road');
            // check if there are any connections to the outside world
            // generate a random inhabitant (citizen, expat, enterpreneur)
            // tohandleparcicipant

            this.busy = true;
            console.log('inhabitantprocess process is ticking');
            this.busy = false;
        }
    }
}