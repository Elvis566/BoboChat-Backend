import {createChat, deleteChat} from '../controllers/ChatController.js';
import { Router } from 'express';

const router = Router();

router.post('/create', createChat);
router.delete('/delete/:id', deleteChat);

export const routerChat = router