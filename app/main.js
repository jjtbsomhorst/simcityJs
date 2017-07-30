var p = {
        palette: "util/palette",
        MenuBar: 'toolbars/menubar',
        Toolbar: 'toolbars/Toolbar',
        Utilbar: 'toolbars/UtilBar',
        zonebar: 'toolbars/ZoneToolbar',
        StatusBar: 'toolbars/FundsBar', 
        inhabitantsBar: 'toolbars/InhabitantsBar', 
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
        InformationLayer: 'layers/InformationLayer',
        RoadGrid: 'layers/RoadGrid',
        BaseProcess: 'processes/BaseProcess',
        FundsProcess: 'processes/FundsProcess',
        trafficLayer: 'layers/TrafficLayer',
        trafficZone: 'zones/TrafficZone',
        InhabitantProcess: 'processes/InhabitantProcess',
        Grid: 'Grid',
        MouseHandler: "MouseHandler",
        Game: 'Game',
        BetterSet: "BetterSet",
        Inhabitant: "entities/inhabitant",
        PathFinding: "processes/PathFinding",
        Point: "Point",
        
        uiElement: "ui/UIElement",
        textLabel: "ui/Label",
        button: "ui/Button",
        textInput: "ui/TextInput",
        numberInput: "ui/NumberInput",
        BasicWindow: 'ui/BasicWindow',
        BudgetWindow: 'ui/BudgetWindow',
        ZoneInfoWindow: 'ui/ZoneInfoWindow',
    };

var objects = [];
for(var o in p){
    objects.push(o);
}

requirejs.config({
    paths: p
});



require(objects,function(){
    window.g = new game("canvas");
});
