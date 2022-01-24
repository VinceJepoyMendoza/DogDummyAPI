import Dog from '../models/Dog.js'
import { singleDogSchema } from '../controller/dog.js'

// Get single dog by id
export const getSingleDogById = async (req, res) => {
  const { dogId } = req.params
  let dog = await Dog.findOne({ id: dogId })
  // Return error if dog with this id not found
  if (!dog) return res.status(200).json({ msg: 'No Dog found with this id' })
  // Control results
  dog = singleDogSchema(dog, req.get('host'))
  res.status(200).json(dog)
}

// Get single dog with name
export const getSingleDogByName = async (req, res) => {
  const { dogName } = req.params
  const dogs = await Dog.find({})

  //
  let dog = dogs.filter(
    (dog) => dog.name.toLowerCase() === dogName.toLowerCase()
  )[0]

  // Return error if dog with this name not found
  if (!dog) return res.status(200).json({ msg: 'No Dog found with this name' })
  // Control results
  dog = singleDogSchema(dog, req.get('host'))
  res.status(200).json(dog)
}
