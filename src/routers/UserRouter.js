import { saveUser, login, update } from "../controllers/UserController.js";
import { Router } from "express";

const router = Router()

router.post('/create', saveUser);
router.post('/login', login);
router.put('/update', update)

export const routerUser = router;