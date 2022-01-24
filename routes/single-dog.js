import express from 'express'
import {
  getSingleDogById,
  getSingleDogByName,
} from '../controller/single-dog.js'

const router = express.Router()

router.route('/id/:dogId').get(getSingleDogById)
router.route('/name/:dogName').get(getSingleDogByName)

export default router
