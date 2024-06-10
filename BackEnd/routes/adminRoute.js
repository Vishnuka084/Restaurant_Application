import express from 'express';
import { adminSignUp } from '../controller/adminController';

const router = express.Router();

// admin singup ------->
router.post('/signup', adminSignUp);


export default router;
