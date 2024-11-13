export class Booking {
  public vehicleId: number;
  public bookedDate: string;
  public bookedTime: string;
  public repairId: number;
  public description: string;

  constructor(
    vehicleId: number,
    bookeDate: string,
    bookedTime: string,
    repairId: number,
    description: string
  ) {
    this.vehicleId = vehicleId;
    this.bookedDate = bookeDate;
    this.bookedTime = bookedTime;
    this.repairId = repairId;
    this.description = description;
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
