import { AvatarModel } from "../models/AvatarModel.js";

export const saveAvatar = async(req, res)=>{
    const url = `http://localhost:3000/images/${req.file.filename}`;

    try {
        if(!url){
            return res.status(401).json({message: 'Create not invalid'})
        }
    
        const AVATAR  = await AvatarModel.create({
            url: url
        });
    
        return res.status(200).json({avt: AVATAR, message: 'Avatar guardado crorrectamente'});
        
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const getAvatarAll = async(req, res)=>{
    const ID  = req.params.id
    try {
        const AVATAR =  await AvatarModel.findByPk(ID);

        if(!AVATAR){
            return res.status(401).json({message: 'No found users'})
        }
    
        return res.status(200).json({avt: AVATAR, message: 'Usuarios encontrados'})
    } catch (error) {
        return res.status(500).json({message: error})
        
    }
}