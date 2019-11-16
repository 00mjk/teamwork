const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const verifyToken = jwt.verify(token, 'TEAMWORK_SECRET_KEY');
      const { userEmail } = verifyToken;

      if (req.body.email && req.body.email !== userEmail) {
        res.status(400).json({
          status: 'error',
          error: 'Invalid user email',
        });
      } else {
        next();
      }
    } else {
      res.status(403).json({
        status: 'error',
        error: 'No authentication token supplied',
      });
    }
  } catch (err) {
    res.status(401).json({
      status: 'error',
      error: `You are authorized: ${err}`,
    });
  }
};
