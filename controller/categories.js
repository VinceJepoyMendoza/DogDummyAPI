import Dog from '../models/Dog.js'
import dogQueries, { sortDogs } from '../middleware/dog-queries.js'
import { dogsSchema } from './dog.js'
import notFound from '../middleware/notFound.js'

// Get all categories present
export const getCategories = async (req, res) => {
  let categories = await Dog.find({})

  categories = [
    ...new Set(categories.map((category) => category.category)),
  ].sort()

  res.status(200).json(categories)
}

// Get all dogs in the category
export const getCategoryDogs = async (req, res) => {
  const { currCategory } = req.params
  const { sort } = req.query
  let dogs = await Dog.find({ category: currCategory })

  if (!dogs.length)
    return res
      .status(404)
      .json({ msg: `No dogs found with the category of ${currCategory}` })

  // Allows to sort result
  if (sort) dogs = sortDogs(dogs, req.get('host'))

  // Control the result
  dogs = dogsSchema(dogs, req.get('host'))
  res.status(200).json(dogs)
}

export const getFilteredCategoryDogs = async (req, res) => {
  const { currCategory } = req.params

  // Return not found if there's no query present
  if (!Object.keys(req.query).length) return notFound(req, res)

  let dogs = await Dog.find({ category: currCategory })
  // Return error for invalid category
  if (!dogs.length)
    return res
      .status(404)
      .json({ msg: `No dogs found with the category of ${currCategory}` })

  // Queries included
  dogs = dogQueries(dogs, req.query)
  // Return error for invalid category
  if (!dogs.length)
    return res
      .status(404)
      .json({ msg: `Dogs not found. Please try again with your queries.` })

  // Control the result
  dogs = dogsSchema(dogs, req.get('host'))
  res.status(200).json(dogs)
}
