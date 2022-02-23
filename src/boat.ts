
export enum BoatStatus {
  WAITING = 0,
  GOINGOUT = 1,
  LOADING = 2,
  COMINGIN = 3,
  UNLOADING = 4
}

export interface Condition {
  totalTime: number, 
  loadTime: number,
  unloadTime: number,
  boatsCount: number,
  locationTime: number,
  carryUp: number,
  boatInRiver: number
}

export const DefaultCondition: Condition = {
  totalTime: 120, 
  loadTime: 1,
  unloadTime: 2,
  boatsCount: 20,
  locationTime: 10,
  carryUp: 6,
  boatInRiver: 2
}

export class Boat {

  status:BoatStatus
  time: number

  constructor(data: any = {}) {
    this.status = BoatStatus.WAITING
    this.time = 0
  }

  public updatedBoatStatusOnTime(condition: Condition) {
    if (this.time <= 0) {
      if (this.status === BoatStatus.WAITING) {
        // Do nothing
      } else if (this.status === BoatStatus.GOINGOUT) {
        this.status = BoatStatus.LOADING
        this.time = condition.loadTime * condition.carryUp
      } else if (this.status === BoatStatus.LOADING) {
        // do nothing
      } else if (this.status === BoatStatus.COMINGIN) {
        this.status = BoatStatus.UNLOADING
        this.time = condition.unloadTime * condition.carryUp
      } else if (this.status === BoatStatus.UNLOADING) {
        this.status = BoatStatus.WAITING
      }
    }
  }

}