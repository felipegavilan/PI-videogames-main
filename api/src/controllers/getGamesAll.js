const axios = require('axios');
const { Videogame, Genre } = require('../db')

const getAllGames = async () =>{
    let allGames = [];
    let url = 'https://api.rawg.io/api/games?key=54766e541f1c4010839553c6c72eadee';
        for (let i = 0; i < 5; i++) {
            let allGamesList = await axios.get(url);
            allGamesList.data.results.map(game =>{
                allGames.push({
                    id: game.id,
                    name: game.name,
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    image: game.background_image,
                    platforms: game.platforms.map(p=>p.platform.name),
                    genres: game.genres.map(p=>p.name),
                    created:false,
                   })
            } )
            url = allGamesList.data.next   
            }
    return allGames;
}

const getDbAllGames = async () => {
        const dbGames = await Videogame.findAll({
            include: [{
                model: Genre,
                atributes: ['name'],
                throught: {
                    atributes: []
                }
            }]
        })
        const allGames = await dbGames.map(game => {
            return{
                id: game.id,
                name: game.name,
                released: game.released,
                rating: game.rating,
                image: game.image,
                description: game.description,
                platform: game.platform,
                genres: game.genres.map(gen => gen.name[0]),
                created:true,
            }
        })
    return allGames
}

const concatAllGames = async () =>{
    const apiGames = await getAllGames();
    const dbGames = await getDbAllGames();
    return [ ...dbGames, ...apiGames];
}

module.exports = concatAllGames;