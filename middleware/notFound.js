export default (req, res) => {
  return res.status(404).json({ msg: 'Error 404: Page not found.' })
}
