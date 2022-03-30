import { Router } from 'express'

const router = Router()

router.use('/votes', require('./votes'))

module.exports = router
