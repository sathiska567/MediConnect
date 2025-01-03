const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const authLoginController = async(req,res)=>{
  try {
    console.log(req.body);
    const {email , password} = req.body

    const secretKey = process.env.SECRETE_KEY; // Make sure to store this in an environment variable
    const options = {
      expiresIn: '1h', // Token expiration time
    };

    const data = await authModel.findOne({email:email})

    const payload = {
      email: data.email,
    };

    if(!data){
      return res.status(400).send({
        success:false,
        message:"User not found"
      })
    }

    const isValidPassword = await bcrypt.compare(password , data.password)
    if(!isValidPassword){
      return res.status(400).send({
        success:false,
        message:"Invalid Password"
      })
    }

    // Create the token
    const jwtToken = jwt.sign(payload, secretKey, options);

    return res.status(200).send({
      success:true,
      message:"Login Successfully",
      data: {
        user: data, 
        token: jwtToken,
      },
    })
    
  } catch (error) {
     res.status(400).send({
       success:false,
       message:"Have an error while login" 
     }
     )
  }
}

const authOneUserDetailsController = async(req,res)=>{
  try {
    const data = await authModel.findOne({email:req.body.email})
    return res.status(200).send({
      success:true,
      message:"User Details Fetch Successfully",
      data: {
        user: data, 
      },
    })
  } catch (error) {
    return res.status(400).send({
      success:false,
    })
  }
}

module.exports = { authController , authLoginController , authOneUserDetailsController };
