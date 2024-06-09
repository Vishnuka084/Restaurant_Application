import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js'
import ErrorHandler from './error.js';

export const isAuthenticatedAdmin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Not authorized, please log in", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);

    if (!req.admin) {
      return next(new ErrorHandler("Not authorized, please log in", 401));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Not authorized, please log in", 401));
  }
};