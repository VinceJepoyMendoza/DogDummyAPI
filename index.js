import 'express-async-errors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import ratelimiter from 'express-rate-limit'

// Middlewares
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/error-handler.js'

// Import all routes
import dogRoutes from './routes/dog.js'
import singleDogRoutes from './routes/single-dog.js'
import listRoutes from './routes/categories.js'
import colorRoutes from './routes/color.js'
import imagesRoute from './routes/images.js'
// For development purposes only
// import devRoutes from './routes/development.js'

dotenv.config()
const app = express()
// Initial middleware
app.use(express.json())
app.set('trust proxy', 1)
// Limit requests
app.use(
  ratelimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 250 request per windowMs
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())

// Initial route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', msg: 'Welcome to JaraPaw' })
})

// Routes
app.use('/dogs', dogRoutes)
app.use('/dog', singleDogRoutes)
app.use('/categories', listRoutes)
app.use('/colors', colorRoutes)
app.use('/images', imagesRoute)
app.use('/image', express.static('image'))
// For development purposes and is not included in live
// app.use('/development', devRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Connecting to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, console.log(`Server is running on PORT ${PORT}`))
  })
  .catch((err) => console.log(err))
