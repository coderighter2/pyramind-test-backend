const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get("/stones-amount", (req, res) => {
  const amount = controller().stonesAmount()
  return res.status(200).json({
    amount: amount,
    success: true
  })
})

module.exports = router
