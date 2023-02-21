const axios = require('axios');
const {Videogame, Genre} = require('../db');

const getApiGameById = async (id) =>{
    let gameById = []
        let apiGamesById = await axios.get(`https://api.rawg.io/api/games/${id}?key=54766e541f1c4010839553c6c72eadee`);
            gameById.push({
                id: apiGamesById.data.id,
                name: apiGamesById.data.name,
                description: apiGamesById.data.description.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""), 
                released: apiGamesById.data.released,
                rating: apiGamesById.data.rating,
                platforms: apiGamesById.data.platforms.map(p=>p.platform.name),
                genres: apiGamesById.data.genres.map(p=>p.name),
            })           
            return gameById
}

const getDbGameById = async (id) =>{

   let gameIdBd = await Videogame.findAll({
    where: {
        id : id,
    },
    include:{
        model: Genre,
        atributes: ['name'],
        throught:{
            atributes:[]
        }
    }
   })

   const res = gameIdBd.map(game => {
    return{
        id: game.id,
        name: game.name,
        description: game.description.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        released: game.released,
        rating: game.rating,
        image: game.background_image,
        platforms: game.platforms,
        created: game.created,
        genres: game.genres.map(p=>p.name)
    }
   })
   return res
}

const getGameById = async (id, source) =>{
    const game = source == "bdd" ? 
    await getDbGameById(id) :
    await getApiGameById(id);

    return game
}

module.exports = getGameById;