import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.js';
import ErrorHandler from '../middlewares/error.js';


export const admin_login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }).status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    return next(error);
  }
};
