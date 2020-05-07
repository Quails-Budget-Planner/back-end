module.exports = {
  validateRegister: (req, res, next) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      res.status(400).json({message: "Invalid body."})
    } else {
      req.register = { username, password, name }
      next();
    }
  }
}