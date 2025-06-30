import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY || "defaultSecretKeyForDev"


export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)

   
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.admin = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token", error: e.message })
  }
};
