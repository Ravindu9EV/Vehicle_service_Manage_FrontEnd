export class Vehicle{
    public id:number;
    public userId:number;
    public model:string;
    public licensePlate:string;
    public madeYear:string;

    constructor(id:number,userId:number,model:string,licensePlate:string,madeYear:string){
        this.id=id;
        this.userId=userId;
        this.model=model;
        this.licensePlate=licensePlate;
        this.madeYear=madeYear
    }

    public getId():number{
        return this.id
    }
    public getUserId():number{
        return this.userId;
    }
    public getModel():string{
        return this.model;
    }
    public getLicensePlate():string{
        return this.licensePlate;
    }

    public getMadeYear():string{
        return this.madeYear;
    }

}