const axios = require('axios');

const getGamesAll = require('../controllers/getGamesAll')


const getGamesSearchDb = async(search) =>{
 

    const games = await getGamesAll();
    let gamesSearch = []
    games.map(game => game.name.includes(search) ? gamesSearch.push(game) : false )

    return gamesSearch
    
}



module.exports= {getGamesSearchDb}

