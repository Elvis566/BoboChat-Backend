import { UserModel} from '../models/UserModel.js'
import { FriendModel} from '../models/FriendModel.js'
import { AvatarModel } from '../models/AvatarModel.js'

export const saveFriend = async(req, res)=> {
    const {user_id, friend_id} = req.body;

    try {
        if(!user_id || !friend_id){
            return res.status(400).json({message: 'No input invalid'});
        }

        const FRIEND = await FriendModel.create({
            user_id: user_id,
            friend_id, friend_id
        })
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const update = async(req, res)=> {
    const ID = req.params.id;
    const apodo = req.body.apodo
    try {
        const friend = await FriendModel.findByPk(ID);
        if(!friend){
            return res.status(401).json({message: 'Not found'})
        }

        if(!apodo){
            return res.status(400).json({message: 'Error, input no invalid'})
        }

        friend.set({apodo: apodo});
        friend.save();

        return res.status(200).json({friend: friend, message: 'update friend'})

    } catch (error) {
        return res.status(500).json({message: error});
    }
}




