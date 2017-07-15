"use strict"

class ZoneLoader{

	static getGuid(){
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  		)
	}

	static getZoneTypes(){
		return  ['PowerLine','PowerPlant','Industrial','Residential','Road','Soil','Commercial'];
	}

	static contains(source,compareTo, whatToCompare){
		let doesContain = false;
		switch(whatToCompare){
			case 'class':
				compareTo.forEach((entry)=>{
					try{
						if(entry.getClass() == source.getClass()){
							doesContain = true;
							return;
						}
					}catch(e){}
				});
				break;
			case 'superclass':

				compareTo.forEach((entry)=>{
					try{
						if(ZoneLoader.getSuperClassName(entry) == ZoneLoader.getSuperClassName(source)){
							doesContain = true;
							return;
						}
					}catch(e){}
				});
				break;
		}
		return doesContain;
	}

	static getSuperClassName(o){
		try{
			return  Object.getPrototypeOf(Object.getPrototypeOf(o)).constructor.name;
		}catch(e){

		}
		return "";
	}


	static getZoneObject(z,x,y){
		switch(z){
		
		case "residential":
			return new Residential(x,y);
		case "industrial":
			return new Industrial(x,y);
		case "commercial":
			return new Commercial(x,y);
		case "road":
			return new Road(x,y);
		case "powerplant":
			return new PowerPlant(x,y);
		case "PowerLine":
			return new PowerLine(x,y);
		default:
			return new Soil(x,y); 
		}
	}
}