export class Booking {
  public id: number;
  public vehicleId: number;
  public bookedDate: string;
  public bookedTime: string;
  public repairId: number;
  public description: string;

  constructor(
    id: number,
    vehicleId: number,
    bookeDate: string,
    bookedTime: string,
    repairId: number,
    description: string
  ) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.bookedDate = bookeDate;
    this.bookedTime = bookedTime;
    this.repairId = repairId;
    this.description = description;
  }

  public getId() {
    return this.id;
  }
  public getVehicleId() {
    return this.vehicleId;
  }
  public getBookedDate() {
    return this.bookedDate;
  }
  public getBookedTime() {
    return this.bookedTime;
  }
  public getRepairId() {
    return this.repairId;
  }
  public getDescription() {
    return this.description;
  }
}
