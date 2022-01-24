import mongoose from 'mongoose'

const DogSchema = mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Please provide name'],
  },
  name: { type: String, required: [true, 'Please provide name'] },
  category: {
    type: String,
    enum: [
      'working',
      'herding',
      'hound',
      'sporting',
      'non-sporting',
      'toy',
      'terrier',
    ],
    required: [true, 'Please provide category'],
  },
  image: {
    type: String,
    required: [true, 'Please provide image'],
  },
  description: { type: String, required: [true, 'Please provide description'] },
  colors: { type: [String], required: [true, 'Please provide color'] },
  height: { type: Object, required: [true, 'Please provide height'] },
  weight: { type: Object, required: [true, 'Please provide weight'] },
  life_expectancy: {
    type: Object,
    required: [true, 'Please provide expectancy'],
  },
  family_life: {
    type: Object,
    required: [true, 'Please provide family life'],
  },
  personality: {
    type: Object,
    required: [true, 'Please provide personality'],
  },
})

export default mongoose.model('Dog', DogSchema)
