import user from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

// create a avlidation for the object
const userSchema = z.object({
  username: z.string().min(3, { message: "username atleat 3 character long" }),
  email: z.string().email(4, "USer already exist"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // throw this message if the the all fields are not fullfill
    if ((!username, !email, !password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // when get all fields data store it in the variable name as a validation

    const validation = userSchema.safeParse({ username, email, password });

    /// if validation error is that throw error that how email password and username works for that code is below

    if (!validation.success) {
      // return res.status(400).json({ errors: validation.error.errors });

      // with upper code we get the error in errors to solve that prblem we use map method for that code is below
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const User = await user.findOne({ email });
    if (User) {
      return res.status(400).json({ message: "User already registerd" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ username, email, password: hashPassword });
    await newUser.save();
    if (newUser) {
      res.status(201).json({ message: "User registered succesfully", newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to registered the user" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const User = await user.findOne({ email }).select("+password");
    if (!User || !(await bcrypt.compare(password, User.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "User loggedin Succesfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to login the user" });
  }
};

export const Logout = (req, res) => {
  console.log("this is Logout function");
};
