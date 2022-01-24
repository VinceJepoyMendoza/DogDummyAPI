import express from 'express'
import {
  getCategories,
  getCategoryDogs,
  getFilteredCategoryDogs,
} from '../controller/categories.js'

const router = express.Router()

router.get('/', getCategories)
router.get('/:currCategory/filter', getFilteredCategoryDogs)
router.get('/:currCategory', getCategoryDogs)

export default router
