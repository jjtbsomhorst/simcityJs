"use strict"

class TrafficLayer extends TileLayer{
    constructor(source){
        super(source);
        this.setDrawableZones(['TrafficZone']);
    }
}