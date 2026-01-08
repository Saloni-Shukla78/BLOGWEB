const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    
  try {
    const { fullname, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({
      message: "Registered Successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email.",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Invalid Password.",
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    
    res.status(200).json({
      message: "Login successfully.",
      token,
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
