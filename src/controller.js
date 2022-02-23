
const AmountCon = () => {

  const DefaultValue = {
    allTime: 38,
    loadTime: 1,
    unloadTime: 2,
    distanceTime: 10,
    carryUp: 6,
    boatInRiver: 2,
    boatsCount: 20
  }  

  const BoatStatus = {
    WAITING: 0,
    GOINGOUT: 1,
    LOADING: 2,
    COMINGIN: 3,
    UNLOADING: 4
  }

  const stonesAmount = (data = DefaultValue) => {

    let stoneAmount = 0;
    let boats = boatsOnInit(data.boatsCount)

    for (let time = 0; time <= data.allTime; time++) {
      console.log(time);
      boats.forEach((_, i) => {
        boats[i].time -= 1;
        if (boats[i].status === BoatStatus.UNLOADING) {
          if (boats[i].time % data.unloadTime === 0) {
            stoneAmount += 1;
          }
        }
        updatedBoatStatusOnTime(boats[i])
      })
      updateBoatsForRiverStatus(boats, data)
    }

    console.log(boats)
    return stoneAmount
  }

  const boatsOnInit = (count) => {
    let boats = [];
    for (let i = 0; i < count; i++) {
      boats.push({
        status:BoatStatus.WAITING,
        time: 0
      })
    }
    return boats
  }

  function updatedBoatStatusOnTime(boat) {
    if (boat && boat.time <= 0) {
      if (boat.status === BoatStatus.WAITING) {
        // Do nothing
      } else if (boat.status === BoatStatus.GOINGOUT) {
        boat.status = BoatStatus.LOADING;
        boat.time = DefaultValue.loadTime * DefaultValue.carryUp;
      } else if (boat.status === BoatStatus.LOADING) {
        // do nothing
      } else if (boat.status === BoatStatus.COMINGIN) {
        boat.status = BoatStatus.UNLOADING;
        boat.time = DefaultValue.unloadTime * DefaultValue.carryUp;
      } else if (boat.status === BoatStatus.UNLOADING) {
        boat.status = BoatStatus.WAITING;
      }
    }
    return boat
  }

  function updateBoatsForRiverStatus(boats, condition) {
    const reiverInUse = boats.filter((boat) => (boat.status === BoatStatus.COMINGIN || boat.status === BoatStatus.GOINGOUT) && boat.time > 0).length > 0
    if (!reiverInUse) {
      if (boats.filter((boat) => boat.status === BoatStatus.LOADING && boat.time <= 0).length > 0) {
        let limit = condition.boatInRiver;
        for (let j = 0, limit = 0; j < boats.length && limit < condition.boatInRiver; j ++) {
          if (boats[j].status === BoatStatus.LOADING && boats[j].time <= 0) {
            boats[j].status = BoatStatus.COMINGIN;
            boats[j].time = condition.distanceTime;
            limit += 1;
          }
        }
      } else {
        console.log('going');
        for (let j = 0, limit = 0; j < boats.length && limit < condition.boatInRiver; j ++) {
          if (boats[j].status === BoatStatus.WAITING) {
            boats[j].status = BoatStatus.GOINGOUT;
            boats[j].time = condition.distanceTime;
            limit += 1;
          }
        }
      }
    }
    return boats
  }
  

  return {
    stonesAmount
  }
}



module.exports = AmountCon


