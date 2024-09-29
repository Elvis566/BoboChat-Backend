import { UserModel} from '../models/UserModel.js'
import { Op } from 'sequelize';

import bcryptjs from 'bcryptjs'

export const saveUser = async(req, res)=>{
    const {apodo, email, password, avatar_id, descripcion} = req.body;
    try {
        if(!apodo || !email || !password || !avatar_id){
            return res.status(401).json({message:'Error all create in user'})
        }
    
        const verifEmail = await UserModel.findOne({where:{email:email}});
    
        if(verifEmail){
            return res.status(400).json({message: 'email is already exist'});
        }
        const encrypPassword = await bcryptjs.hash(password.toString(), 10);
        const USER = await UserModel.create({
            apodo: apodo,
            email: email,
            password: encrypPassword,
            avatar_id: avatar_id,
            descripcion: descripcion
        }) 
    
        if(!USER){
            return res.status(400).json({
                message: 'Not, no create user'
            })
        }
    
        return res.status(200).json({
            user: USER,
            message: 'create user'
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }


}

export const login = async(req, res)=> {
    const {email, password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({message: 'Email is not exist'})
        }

        const verifEmail = await UserModel.findOne({where:{email:email}});

        if(!verifEmail){
            return res.status(400).json({message: 'Email is not found'})
        }

        const verifPassword = await bcryptjs.compare(password, verifEmail.password);

        if(!verifPassword){
            return res.status(400).json({message: 'Password is not invalid'})
        }

        return res.status(200).json({
            user: verifEmail,
            message: 'Logeado correctamente'
        })


    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const update = async(req, res)=> {
    const ID  = req.params.id;
    const {avatar_id, apodo, descripcion} = req.body;

    try {
        const user = await UserModel.findByPk(ID);

        if(!user){
            return res.status(400).json({message: 'no found user'})
        }

        user.set({apodo: apodo, descripcion: descripcion, avatar_id: avatar_id});
        user.save();

        return res.status(200).json({user: user, message:'Update user'})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const busqueda = async(req, res)=>{
    const CRITERIO = req.params.criterio;

    try {
        if(!CRITERIO){
            return res.status(400).json({message: 'Not input invalid'});
        }

        const ENCONTRADO = await UserModel.findAll({
            where: {
                apodo: {
                    [Op.like]:  `%${CRITERIO}%`
                }
            }
        });

        if(!ENCONTRADO){
            return res.status(401).json({message: 'Not found'})
        }

        return res.status(400).json({ENCONTRADO: ENCONTRADO});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

