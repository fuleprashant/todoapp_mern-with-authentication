import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized..." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // here in decode we get the todo indivitually by the login user
    console.log(decoded);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
