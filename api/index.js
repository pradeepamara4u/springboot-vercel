module.exports = (req, res) => {
  res.status(200).json({
    message: "Hello from Spring Boot on Vercel!",
    path: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
};
