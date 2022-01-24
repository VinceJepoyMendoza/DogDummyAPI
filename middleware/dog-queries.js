// Queries
export default (dogs, query) => {
  const { limit, search, sort, color, minLifeExpectancy, maxLifeExpectancy } =
    query
  // Heights and Weights queries
  const {
    maleMinHeight,
    maleMaxHeight,
    femaleMinHeight,
    femaleMaxHeight,
    maleMinWeight,
    maleMaxWeight,
    femaleMinWeight,
    femaleMaxWeight,
  } = query

  // Filtering all dogs that match the query
  if (search)
    dogs = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(search.toLowerCase())
    )

  // Retrieving  all dogs that includes the color
  if (color)
    dogs = dogs.filter((dog) => {
      let isIncluded = false
      for (let i of dog.colors) {
        if (i.toLowerCase().includes(color.toLowerCase())) isIncluded = true
      }

      return isIncluded && dog
    })

  // Heights
  if (maleMinHeight)
    dogs = physicalMeasure('height', 'male', 'min', maleMinHeight, dogs)
  if (maleMaxHeight)
    dogs = physicalMeasure('height', 'male', 'max', maleMaxHeight, dogs)
  if (femaleMinHeight)
    dogs = physicalMeasure('height', 'female', 'min', femaleMinHeight, dogs)
  if (femaleMaxHeight)
    dogs = physicalMeasure('height', 'female', 'max', femaleMaxHeight, dogs)
  // Weight
  if (maleMinWeight)
    dogs = physicalMeasure('weight', 'male', 'min', maleMinWeight, dogs)
  if (maleMaxWeight)
    dogs = physicalMeasure('weight', 'male', 'max', maleMaxWeight, dogs)
  if (femaleMinWeight)
    dogs = physicalMeasure('weight', 'female', 'min', femaleMinWeight, dogs)
  if (femaleMaxWeight)
    dogs = physicalMeasure('weight', 'female', 'max', femaleMaxWeight, dogs)

  // Min life expectancy
  if (minLifeExpectancy)
    dogs = dogs.filter(
      (dog) => dog.life_expectancy.min >= Number(minLifeExpectancy)
    )
  // Max life expectancy
  if (maxLifeExpectancy)
    dogs = dogs.filter(
      (dog) => dog.life_expectancy.max <= Number(maxLifeExpectancy)
    )

  // Sorting result
  if (sort) dogs = sortDogs(dogs, sort)

  // Limits result
  if (limit) dogs = limitItems(dogs, limit)

  return dogs
}

// Limiting items
export const limitItems = (arr, limit) => arr.splice(0, Number(limit))

// Sorting
export const sortDogs = (dogs, order) => {
  // Sorting dog's name
  let sortedName = dogs.map((dog) => dog.name)
  if (order === 'desc') sortedName.sort((a, b) => b.localeCompare(a))
  else if (order === 'asc') sortedName.sort((a, b) => a.localeCompare(b))
  // Sort dogs in descending
  let temp = []
  for (let i of sortedName) {
    // Adding retrieved individual dog
    temp.push(dogs.find((dog) => dog.name === i))
  }

  return temp
}

// Heights and Weights queries event
export const physicalMeasure = (unit, sex, minmax, value, dogs) => {
  dogs = dogs.filter((dog) => {
    if (minmax === 'min') return dog[unit][sex][minmax] >= Number(value)
    else return dog[unit][sex][minmax] <= Number(value)
  })

  return dogs
}
