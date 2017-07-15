"use class"

class FundsProcess extends BaseProcess{


    tick(){
        if(!this.busy){
            this.busy = true;
            console.log('FUND process is ticking');
            this.busy = false;
        }
    }
}