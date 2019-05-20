module.exports = (req, res, next) => {
    const { email } = req.body;
    //regular expression to check if : anystring@anystring.anystring
    if (email.match(/\S+@\S+\.\S+/)) {
      next();
    } else {
      res.status(400).json({
        message:
          "Please provide correct email for the user. Ex: anystring@anystring.anystring"
      });
    }
  };