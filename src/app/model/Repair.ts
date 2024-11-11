export class Repair{
    public id:number;
    public type:string;
    public cost:string;
    public duration:string;
    public description:string;

    constructor(id:number,type:string,cost:string,duration:string,description:string){
        this.id=id;
        this.type=type;
        this.cost=cost;
        this.duration=duration;
        this.description=description;
    }

    public getId():number{
        return this.id;
    }
    public getType():string{
        return this.type;
    }
    public getCost():string{
        return this.cost;
    }
    public getDuration():string{
        return this.duration;
    }
    public getDescription(){
        return this.description;
    }
}