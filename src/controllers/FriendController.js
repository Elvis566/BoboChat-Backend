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

export const getFriends = async(req, res)=> {
    // ID del usuario del que deseamos obtener sus amigos
    const ID = req.params.id

    // Bloques de con el listados de inclusiones para el apartado de relaciones de amistades

    // Bloque si eres creador de la relacion de amistad
    const includeCreateFriends = {
        model: UserModel,
        as: 'enlaceU',
        attributes: ['id', 'apodo', 'avatar_id'],
        include: {
            model: AvatarModel,
            as: 'enlaceA',
            attributes: ['url']
        }
    };
    // Bloque si no eres creador de la relacion de amistad
    const includeUserFriends = {
        model: UserModel,
        as: 'enlaceF',
        attributes: ['id', 'apodo', 'avatar_id'],
        include: {
            model: AvatarModel,
            as: 'enlaceA',
            attributes: ['url']
        }
    };

    try {
        const FRIENDS = await FriendModel.findAll({
            where: {'user_id': ID},
            include: includeUserFriends
        });

        const FRIEND = await FriendModel.findAll({
            where: {'friend_id': ID}
        });

    // Mapeo y combinacion de los resultados en una sola variable

    const DataFriends =[
        ...FRIENDS.map(friend =>({
            id: friend.enlaceU.id,
            apodo: friend.enlaceU.apodo,
            url: friend.enlaceU.enlaceA.url
        })),
        ...FRIEND.map(friend => ({
            id: friend.enlaceF.id,
            apodo: friend.enlaceF.apodo,
            url: friend.enlaceF.enlaceA.url
        }))
    ];

    return res.status(200).json({data: DataFriends});
    
    } catch (error) {
        return res.status(500).json({message: error})
    }
}


