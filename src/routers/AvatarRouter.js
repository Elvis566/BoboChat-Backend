import { Router } from 'express';
import { getAvatarAll, saveAvatar } from '../controllers/AvatarController.js'
import multer from 'multer'
import path from 'path';

const router = Router();
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '/src/images'))
    },
    filename: (req, file, cb)=> {
        cb(null, `image_${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

router.post('/create',upload.single('avatar'), saveAvatar);
router.get('/obtenerAll/:id', getAvatarAll)

export const routerAvatar = router