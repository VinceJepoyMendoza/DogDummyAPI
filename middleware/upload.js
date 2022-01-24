import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      callback(null, true)
    } else {
      console.log(
        `Extension error. ${file.mimetype} is not supported. jpeg and png are the only supported `
      )
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 6.5,
  },
})

export default upload
