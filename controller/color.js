import Dog from '../models/Dog.js'
import notFound from '../middleware/notFound.js'
import { limitItems } from '../middleware/dog-queries.js'

// Get all colors ? sort
export const getColors = async (req, res) => {
  const { sort } = req.query
  const dogs = await Dog.find({})

  let colors = []
  // Filtering unique colors
  colors = filterUniqueColors(dogs)

  // Sort colors default to ascending order
  colors.sort((a, b) => a.localeCompare(b))

  // Sort colors to descending order
  sort === 'desc' && colors.sort((a, b) => b.localeCompare(a))

  colors = translateColors(colors)

  res.status(200).json(colors)
}

// Get filtered colors ? sort, limit, search
export const filterColors = async (req, res) => {
  const { sort, limit, search } = req.query
  const dogs = await Dog.find({})

  if (!Object.keys(req.query).length) return notFound(req, res)

  let colors = []
  // Filtering unique colors
  colors = filterUniqueColors(dogs)

  // Sort colors default to ascending order
  colors.sort((a, b) => a.localeCompare(b))

  // Sort colors to descending order
  sort === 'desc' && colors.sort((a, b) => b.localeCompare(a))

  // Return only color that matches the search query
  if (search)
    colors = colors.filter((color) =>
      color.toLowerCase().includes(search.toLowerCase())
    )

  // Limits the result
  if (limit) colors = limitItems(colors, limit)

  if (!colors.length)
    return res.status(404).json({
      msg: 'Colors not found. Please check your queries',
    })

  colors = translateColors(colors)

  res.status(200).json(colors)
}

// Return only single color with repeated value
const filterUniqueColors = (dogs) => {
  let colors = []
  dogs.forEach((dog) => {
    // Looping through current iteration's colors
    // Checking if the current color is not included in colors
    // Push only not included color to colors
    for (let i of dog.colors) !colors.includes(i) && colors.push(i)
  })
  return colors
}

// Translate db oriented colors to readable string color
export const translateColors = (colors) => {
  return colors.map((color) => {
    // Replace '_' (underscore) with ' ' (space)
    if (color.includes('_')) color = color.split('_').join(' ')

    // Replace '-' (dash) with ' and ' keyword
    if (color.includes('-')) color = color.split('-').join(' & ')

    return color
  })
}
