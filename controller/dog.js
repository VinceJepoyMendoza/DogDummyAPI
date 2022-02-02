// Dog schema
import Dog from '../models/Dog.js'
// Queries
import queries, { sortDogs } from '../middleware/dog-queries.js'
import notFound from '../middleware/notFound.js'
// Translate colors
import { translateColors } from './color.js'

// Get all dogs with queries
export const getAllDogs = async (req, res) => {
  const { sort } = req.query

  // Fetching all dogs from DB
  let dogs = await Dog.find({})

  // Sorting result
  if (sort) dogs = sortDogs(dogs, sort)

  dogs = dogsSchema(dogs, req.get('host'))

  res.status(200).json(dogs)
}

// Filter dogs
export const filterDogs = async (req, res) => {
  // Fetching all dogs from DB
  let dogs = await Dog.find({})

  // Return not found if there's no query present
  if (!Object.keys(req.query).length) return notFound(req, res)

  // Allows quieries
  dogs = queries(dogs, req.query)

  // Send error if queries are falsy
  if (!dogs.length)
    return res.status(404).json({
      msg: 'Dogs not found. Please try again with your queries.',
    })

  dogs = dogsSchema(dogs, req.get('host'))
  res.status(200).json(dogs)
}

// Return dog's controlled result
export const dogsSchema = (dogs, url) =>
  dogs.map((dog) => singleDogSchema(dog, url))

// Isolate/Arrange results - remove _id and __v
export const singleDogSchema = (dog, url) => {
  let {
    id,
    name,
    category,
    image,
    description,
    colors,
    height,
    weight,
    life_expectancy,
    family_life,
    personality,
  } = dog

  // Translate db oriented colors to readable string
  colors = translateColors(colors)

  // Transform DB url to live image url
  image = transformImgUrl(url, image)

  return {
    id,
    name,
    category,
    image,
    description,
    colors,
    life_expectancy,
    height,
    weight,
    family_life,
    personality,
  }
}

// Transform DB url to live image url
// Append url to image and replace '\' with '/'
export const transformImgUrl = (url, image) =>
  `https://${url}/${image.split('\\').join('/')}`
