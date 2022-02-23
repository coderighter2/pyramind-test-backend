import { Router } from 'express'
import * as Controller from './controller'

export class Routes {

  router: Router

  constructor() {
    this.router = Router()
    this.router.use('/stones-amount', (_, res) => {
      return res.status(200).json({
        amount: Controller.maxStonesAmount(),
        success: true
      })
    })
  }
}
export default new Routes().router
