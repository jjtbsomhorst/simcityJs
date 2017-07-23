"use strict"
class PathFinder{

    constructor(startingPoint, endPoint,grid){
        this.startPoint = new Point(startingPoint.x,startingPoint.y); // coordinate
        this.endPoint = new Point(endPoint.x,endPoint.y); //coordinate
        this.grid = grid;
        this.openList = new Map();
        this.closedList = new Map();

    }

    getPath(){
        this.openList.set(this.startPoint.getHash(),this.startPoint);
        this.startPoint.setDestination(this.endPoint);
        var path = this.findPath();
        if(path != null){
            return this.extractPath(path,[]).reverse();
        }
        return [];
    }

    extractPath(p,path){
        if(p == null){
            return path;
        }
        path.push(p.getParent());
        return this.extractPath(p.getParent(),path);
    }

    findPath(){
        var current  = null;        
        this.openList.forEach((element,key)=>{
            if(current == null){
                current = element;
            }
            if(current!=null){
                current.setDestination(this.endPoint);
                if(current.getCosts() < current.getCosts()){
                    current = element;        
                }    
            }
            
        });

        this.closedList.set(current.getHash(),current);
        if(current.getHash() == this.endPoint.getHash()){
            return current;
        }

        this.openList.delete(current.getHash());
        let zones = this.grid.getSurroundingZones(current.getX(),current.getY());
        zones.forEach((layer)=>{
            layer.forEach((zone)=>{
                if(zone != null && (zone instanceof Road || (this.endPoint.getX() == zone.x && this.endPoint.getY() == zone.y))){
                    let p = new Point(zone.x,zone.y);
                    p.setParent(current);
                    if(!this.closedList.has(p.getHash())){
                        if(this.openList.has(p.getHash())){
                            let cp = this.openList.get(p.getHash());
                            if(cp.getCosts() > p.getCosts()){
                                cp.setParent(current);
                            }
                        }else{
                            this.openList.set(p.getHash(),p);
                        }
                    }
                }
            });
        });

        if(this.openList.size == 0){
            return null;
        }

        return this.findPath();
    }

    getHeuristic(p){
        let heuristic = 0;
        if(p.getX() <this.endPoint.getX()){
            heuristic += (this.endPoint.getX() - p.getX()) * 10
        }else{
            heuristic += (p.getX() - this.endPoint.getX()) * 10
        }

        if(p.getY() <this.endPoint.getY()){
            heuristic += (this.endPoint.getY() - p.getY()) * 10
        }else{
            heuristic += (p.getY() - this.endPoint.getY()) * 10
        }


        return heuristic;
    }
    
}
