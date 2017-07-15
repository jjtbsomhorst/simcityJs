var p = {
        Toolbar: 'Toolbar',
        ZoneLoader: "util/ZoneLoader",
        Sprite: 'zones/Sprite',
        Tile: 'zones/Tile',
        Zone: 'zones/Zone',
        Soil: "zones/Soil",
        DemandingZone: 'zones/DemandingZone',
        PowerLine: 'zones/PowerLine',
        PowerPlant: 'zones/PowerPlant',
        Industrial: 'zones/Industrial',
        Comercial: 'zones/CommercialZone',
        Residential: 'zones/Residential',
        Road: 'zones/Road',
        Layer: 'layers/Layer',
        TileLayer: 'layers/TileLayer',
        ZonesLayer: 'layers/ZonesLayer',
        Static: 'layers/StaticLayer',
        Powergrid: 'layers/Powergrid',
        EffectsLayer: 'layers/EffectsLayer',
        RoadGrid: 'layers/RoadGrid',
        Grid: 'Grid',
        Game: 'Game',
        BetterSet: "BetterSet",
    };

var objects = [];
for(var o in p){
    objects.push(o);
}

requirejs.config({
    paths: p
});



require(objects,function(){
    
});
