import Admin from '../models/adminModel.js';

export const adminSignUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const admin = await Admin.create({ username, email, password });
      res.status(201).json({ success: true, admin });
    } catch (error) {
      next(error);
    }
};

