import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json("Token missing");

  const token = authHeader.split(" ")[1]; // Bearer token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); // next route call
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};
