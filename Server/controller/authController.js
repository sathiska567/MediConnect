const bcrypt = require('bcrypt');
const { authModel } = require("../models/authModel");

const authController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if user already exists
    const existingUser = await authModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists.",
      });
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new authModel({ name, email, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User created successfully.",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while creating the user.",
    });
  }
};

module.exports = { authController };
