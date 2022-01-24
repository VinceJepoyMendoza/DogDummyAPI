import express from 'express'
import Dog from '../models/Dog.js'
import { transformImgUrl } from '../controller/dog.js'
import { limitItems } from '../middleware/dog-queries.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { limit } = req.query
  const dogs = await Dog.find({})

  let images = dogs.map((dog) => transformImgUrl(req.get('host'), dog.image))

  if (limit) images = limitItems(images, limit)

  res.status(200).json(images)
})

export default router
