import { saveUser, login, update, busqueda } from "../controllers/UserController.js";
import { Router } from "express";

const router = Router()

router.post('/create', saveUser);
router.post('/login', login);
router.put('/update', update);
router.get('/busqueda/:criterio', busqueda);

export const routerUser = router;