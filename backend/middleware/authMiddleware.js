const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Extract the Bearer token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object
    req.user = { userId: decoded.userId }; // Ensure this matches `userId` in the payload

    next(); // Proceed to the next middleware
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token has expired, please log in again" });
    }
    console.error("JWT verification error:", err);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
