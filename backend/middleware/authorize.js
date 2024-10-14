import jwt from "jsonwebtoken";
import user from "../model/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized..." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // here in decode we get the todo indivitually by the login user here we get the Id also

    // console.log(decoded);
    req.user = await user.findById(decoded.userId); // in the object name of user we find the id of the login user data
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
