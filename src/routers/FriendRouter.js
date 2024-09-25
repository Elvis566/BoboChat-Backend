import {saveFriend, getFriends, update} from '../controllers/FriendController.js'
import { Router } from 'express'  

const router = Router();

router.post('/create', saveFriend)
router.get('/obtener/:id', getFriends)
router.put('/update/:id', update)

export const routerFriends = router