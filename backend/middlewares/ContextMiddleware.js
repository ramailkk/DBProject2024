// middleware/contextMiddleware.js
const redisClient = require('./redisClient'); // Assuming you use Redis for temporary context storage

const attachContext = (req, res, next) => {
  const sessionId = req.headers['session-id']; // Unique identifier for the user/session

  redisClient.get(sessionId, (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'Error retrieving context' });
    }

    if (data) {
      const { userId, listId } = JSON.parse(data);
      req.context = { userId, listId }; // Attach context to the request object
    } else {
      req.context = null; // No context
    }
    next();
  });
};

module.exports = attachContext;
