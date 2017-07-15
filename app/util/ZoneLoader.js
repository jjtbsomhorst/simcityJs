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
				let sourceClass = ZoneLoader.getSuperClassName(source);

				compareTo.forEach((entry)=>{
					try{
						if(ZoneLoader.getSuperClassName(entry) == source){
							return true;
						}
					}catch(e){}
				});
				break;

		}
		return doesContain;
	}

	static equalsAll(source,compareTo,whatToCompare){
		return false;
		// let equals = false;
		// for(var i = 0; i < compareTo.length;i++){
			
		// 	let sourceCompareTo = null;
		// 	let destinationCompareTo = null;
		// 	switch(whatToCompare){
		// 		case 'class':
		// 			sourceCompareTo = source.getClass();
		// 			try{
		// 				if(Array.isArray(compareTo[i])){
		// 					destinationCompareTo = [];
		// 					compareTo[i].forEach((entry)=>{
		// 						if(entry == null){
		// 							destinationCompareTo.push(null);
		// 						}else{
		// 							destinationCompareTo.push(entry.getClass());
		// 						}
		// 					});
		// 				}else{
		// 					if(compareTo[i] != null){
		// 						destinationCompareTo = compareTo[i].getClass();	
		// 					}
		// 				}
						
		// 			}catch(e){}
		// 		break;
		// 		case 'superclass':
		// 			sourceCompareTo = ZoneLoader.getSuperClassName(source);
		// 			try{
		// 				if(Array.isArray(compareTo[i])){
		// 					destinationCompareTo = [];
		// 					compareTo[i].forEach((entry)=>{
		// 						if(entry != null){
		// 							destinationCompareTo.push(ZoneLoader.getSuperClassName(entry));
		// 						}else{
		// 							destinationCompareTo.push(null);
		// 						}
								
		// 					});
		// 				}else{
		// 					destinationCompareTo =  ZoneLoader.getSuperClassName(compareTo[i]);
		// 				}
		// 			}catch(e){}
		// 		break;
		// 		default: 
		// 			sourceCompareTo = source;
		// 			destinationCompareTo = compareTo[i];
		// 		break;
		// 	}

		// 	if(Array.isArray(destinationCompareTo)){
		// 		destinationCompareTo.forEach((entry)=>{
		// 			if(!equals){
		// 				if(entry === sourceCompareTo){
		// 					equals = true;
		// 				}
		// 			}
					
		// 		});
		// 	}else{
		// 		equals = (sourceCompareTo == destinationCompareTo);
		// 	}
			
		// 	if(!equals){
		// 		break;
		// 	}
		// }
		// return equals;
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