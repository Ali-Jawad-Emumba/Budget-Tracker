import jwt from "jsonwebtoken";
const JWT_KEY = `${process.env.JWT_KEY}`;

const authMiddleware = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
