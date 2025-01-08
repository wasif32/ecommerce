import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

//register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }
    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone is required",
      });
    }
    if (!address) {
      return res.status(400).send({
        success: false,
        message: "Address is required",
      });
    }

    //Check if user already exists
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(400).send({
        success: true,
        message: "Already registered please login",
      });
    }

    //Hash password
    const hashedPassword = await hashPassword(password);

    //Register user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration Successful",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email not found, please register",
      });
    }

    console.log(user);
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    //Generate token
    const token = await generateToken(user);

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  console.log("Test route");
  res.send("Test route");
};
