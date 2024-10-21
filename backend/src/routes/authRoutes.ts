import {Router} from 'express'
import { registerHandler } from '../controllers/authController';

const authRouter=Router();
//prefix: /auth

authRouter.post('/register',registerHandler)

export default authRouter