const axios = require('axios');
const { Videogame, Genre } = require('../db')


const getGamesSearchDb = async(search) =>{
 
    const searchGamesDb = await Videogame.findAll({
        where:{
            name: search
        }
    })
     return searchGamesDb
    // return searchGamesDb.videogame.map(game => {
    //     return{        
    //         id: game.dataValue.id,
    //         name: game.dataValue.name,
    //         released: game.dataValue.released,
    //         rating: game.dataValue.rating,
    //         description: game.dataValue.description,
    //         platform: game.dataValue.platform,
    //         genres: game.dataValue.genres.map(gen => gen.name[0]),
    //         created:true,
    //     }
    // }            
    // )
}

const getGamesSearchApi = async (search) =>{

    const searchGamesApi = (axios.get(`https://api.rawg.io/api/games?key=54766e541f1c4010839553c6c72eadee&search=${search}`)).data;

    const searchGame = searchGamesApi.map(game => {
        return{
            id: game.id,
            name: game.name,
            description: game.description,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map(p=>p.platform.name),
            genres: game.genres.map(p=>p.name),
        }
    })
   
    return searchGame
}


module.exports={getGamesSearchDb, getGamesSearchApi}

