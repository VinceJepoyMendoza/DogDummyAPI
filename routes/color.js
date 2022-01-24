import express from 'express'
import { getColors, filterColors } from '../controller/color.js'

const router = express.Router()

router.get('/', getColors)
router.get('/filter', filterColors)

export default router
