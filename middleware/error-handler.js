export default (err, req, res, next) => {
  // Wrong id syntax
  if (err.name === 'CastError')
    return res.status(404).json({ msg: "Wrong dog's id syntax" })

  // Invalid/empty input
  // if (err.name === 'ValidationError')
  //   return res.status(400).json({ msg: 'Fill up all the inputs' })

  if (err.statusCode === 400)
    return res.status(406).json({ status: 'error', msg: 'Payload invalid' })

  res.status(500).send(err)
  // res
  //   .status(500)
  //   .json({
  //     status: 'error',
  //     msg: 'Something went wrong, Please try again later.',
  //   })
}
