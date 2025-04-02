import express from 'express';
import { getTopUsers } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getTopUsers);

export default router;