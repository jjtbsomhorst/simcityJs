"use class"

class FundsProcess extends BaseProcess{

    constructor(game){
        super(game);
        
        this.basefunds = 20*1000;
        this.funds = new Map();
        this.funds.set("Residential",0);
        this.funds.set("Commercial",0);
        this.funds.set("Industrial",0);
        this.funds.set("Road",0);
        this.funds.set("Power",0);
        this.funds.set("Water",0);
    
        this.taxes = new Map();
        this.taxes.set("Residential",9);
        this.taxes.set("Commercial",9);
        this.taxes.set("Industrial",9);

    }

    getInformation(){
        return this.funds;
    }


    getTaxes(){
        return this.taxes;
    }


    sendMessage(type,value){
        switch(type){
            case 'setzone':
                if(value instanceof Residential || value instanceof Commercial || value instanceof Industrial){
                    this.basefunds -= 100;
                }
                if(value instanceof PowerPlant){
                    this.basefunds -= 1000;
                }
                if(value instanceof PowerLine || value instanceof Road){
                    this.basefunds -= 10;
                }
                if(value instanceof Soil){
                    this.basefunds -= 1;
                }
                this.game.sendMessage("totalfunds",this.basefunds);
            break;
        }
    }

    tick(zonedata){

        // get powerzones 
        // get residentials

        super.tick(zonedata);
        if(!this.busy){ // not busy and got queue
            
            this.busy = true;
            let data = new Map();

            if(this.ticks % 5  == 0){
                for(let i  = 0; i < this.game.grid.rows ; i++){
                    
                    for(let j = 0; j < this.game.grid.columns ;j++){
                        if(!data.has(j)){
                            data.set(j,new Map());
                        }else{
                            data.get(j).set(i,this.game.grid.getZones([j,i],true))
                        }
                    }
                } 
                // reset 
                this.funds.forEach((v,k,m)=>{
                    m.set(k,0);
                });

                data.forEach((row)=>{
                    row.forEach((columns)=>{
                        if(Array.isArray(columns) && columns.length > 0){
                            columns.forEach((zone)=>{
                                let currentValue = 0;
                                if(zone instanceof Residential && zone.getInhabitantCount() > 0){
                                    let baseValue = 100*zone.getInhabitantCount();
                                    currentValue = this.funds.get("Residential");
                                    let taxRate = this.taxes.get("Residential");
                                    currentValue += ((baseValue / 100 ) * taxRate);
                                    this.funds.set("Residential",currentValue);
                                }else if(zone instanceof Commercial){
                                    let baseValue = 100*zone.getEmployeeCount();
                                    currentValue = this.funds.get("Commercial");
                                    let taxRate = this.taxes.get("Commercial");
                                    currentValue += ((baseValue / 100 ) * taxRate);
                                    this.funds.set("Commercial",currentValue);
                                }else if(zone instanceof Industrial){
                                    let baseValue = 100*zone.getEmployeeCount();
                                    currentValue = this.funds.get("Industrial");
                                    let taxRate = this.taxes.get("Industrial");
                                    currentValue += ((baseValue / 100 ) * taxRate);
                                    this.funds.set("Industrial",currentValue);
                                
                                }else if(zone instanceof PowerPlant){
                                    currentValue = this.funds.get("Power");
                                    this.funds.set("Power",currentValue-=500); //  powerplants costs money!!
                                }else if(zone instanceof PowerLine){
                                    currentValue = this.funds.get("Power");
                                    this.funds.set("Power",currentValue-=10);
                                }else if(zone instanceof Road){
                                    currentValue = this.funds.get("Road");
                                    this.funds.set("Road",currentValue-=10);
                                }

                            });
                        }
                    });
                });

                this.funds.forEach((f)=>{
                    this.basefunds += f;
                });
                
                this.game.sendMessage("totalfunds",this.basefunds);

            }
            this.busy = false;   
        }
    }
}