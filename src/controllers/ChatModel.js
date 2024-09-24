import { ChatModel} from '../models/ChatModel.js';

export const createChat = async(req, res)=> {
    const {user_one_id, user_two_id} = req.body;

    try {
        if(!user_one_id || !user_two_id){
            return res.status(400).json({message: 'Not input invalid'})
        }

        const CHAT =  await ChatModel.create({
            user_one_id: user_one_id,
            user_two_id: user_two_id
        })

        if(!CHAT){
            return res.status(400).json({message: 'No create saccefull'})
        }

        return res.status(200).json({CHAT: CHAT});
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const deleteChat = async(req, res)=> {
    
}
