import user from "../model/user.model.js";

export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(username);
    // console.log(email);
    // console.log(password);
    const User = await user.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User already registerd" });
    }

    const newUser = new user({ username, email, password });
    await newUser.save();
    if (newUser) {
      res.status(201).json({ message: "User registered succesfully", newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to registered the user" });
  }
};

export const Login = (req, res) => {
  console.log("this is Login function");
};

export const Logout = (req, res) => {
  console.log("this is Logout function");
};
