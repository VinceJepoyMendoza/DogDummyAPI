import express from 'express'
import { getAllDogs, filterDogs } from '../controller/dog.js'

const router = express.Router()

router.route('/').get(getAllDogs)
router.route('/filter').get(filterDogs)

export default router
