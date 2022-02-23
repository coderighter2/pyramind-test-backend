import { Boat, Condition, DefaultCondition, BoatStatus } from './boat'

export function maxStonesAmount(condition: Condition = DefaultCondition) {
  let stoneAmount = 0
  // init boats with total boats count
  let boats = new Array<Boat>()
  for (let i = 0; i < condition.boatsCount; i++) {
    boats.push(new Boat())
  }
  // calculate stone amount for each minutes
  for (let time = 0; time <= condition.totalTime; time++) {
    boats.forEach((_, i) => {
      boats[i].time -= 1
      if (boats[i].status === BoatStatus.UNLOADING) {
        if (boats[i].time % condition.unloadTime === 0) {
          stoneAmount += 1
        }
      }
      // update boat status in each minutes
      boats[i].updatedBoatStatusOnTime(condition)
    })
    updateBoatsForRiverStatus(boats, condition)
  }
  return stoneAmount
}
// update boat status if boats arrive to mining site or pyramid
function updateBoatsForRiverStatus(boats: Boat[], condition: Condition) {
  const reiverInUse = boats.filter((boat) => (boat.status === BoatStatus.COMINGIN || boat.status === BoatStatus.GOINGOUT) && boat.time > 0).length > 0
  if (!reiverInUse) {
    if (boats.filter((boat) => boat.status === BoatStatus.LOADING && boat.time <= 0).length > 0) {
      for (let j = 0, limit = 0; j < boats.length && limit < condition.boatInRiver; j ++) {
        if (boats[j].status === BoatStatus.LOADING && boats[j].time <= 0) {
          boats[j].status = BoatStatus.COMINGIN
          boats[j].time = condition.locationTime
          limit += 1
        }
      }
    } else {
      for (let j = 0, limit = 0; j < boats.length && limit < condition.boatInRiver; j ++) {
        if (boats[j].status === BoatStatus.WAITING) {
          boats[j].status = BoatStatus.GOINGOUT
          boats[j].time = condition.locationTime
          limit += 1
        }
      }
    }
  }
  return true
}
