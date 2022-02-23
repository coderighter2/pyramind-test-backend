import { Router } from 'express'
import * as Controller from './controller'
import { DefaultCondition } from './boat';

export class Routes {

  router: Router

  constructor() {
    this.router = Router()
    this.router.use('/stones-amount', (req, res) => {
      const { totalTime, loadTime, unloadTime, boatsCount, locationTime } = req.query
      if (!totalTime || !loadTime || !unloadTime || !boatsCount || !locationTime) {
        return res.status(500).send('Invalid Params')
      }
      return res.status(200).json({
        amount: Controller.maxStonesAmount({
          totalTime: +totalTime,
          loadTime: +loadTime,
          unloadTime: +unloadTime,
          boatsCount: +boatsCount,
          locationTime: +locationTime,
          carryUp: DefaultCondition.carryUp,
          boatInRiver: DefaultCondition.boatInRiver
        }),
        success: true
      })
    })
  }
}
export default new Routes().router
