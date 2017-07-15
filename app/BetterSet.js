"use strict"

class BetterSet{
    
    constructor(entries){
        if(!Array.isArray(entries)){
            throw 'no array';
        }
        this.entries = entries;    
    }

    difference(entries){
        if(!Array.isArray(entries)){
            throw 'no array';
        }
    }

    getEntries(){
        return this.entries;
    }

    intersection(entries){
        if(!Array.isArray(entries)){
            throw 'no array';
        }
    }
    union  (entries){
        if(!Array.isArray(entries)){
            throw 'no array';
        }
    }

    length(){
        return this.entries.length;
    }

    equals(s){
        let areEqual = true;

        if(s instanceof BetterSet){
            let compareEntries = s.getEntries();
            if(compareEntries.length == this.entries.length){
                this.entries.forEach((entry,index)=>{
                    if(Array.isArray(entry)){
                        entry.forEach((e,i)=>{
                            if(compareEntries[index][i] !== e){
                                areEqual = false;
                            }
                        });
                    }else{
                        if(compareEntries[index] !== entry){
                            areEqual = false;
                        }
                    }
                })
            }
            
        }
        return areEqual;
    }
    
}