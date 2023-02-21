const concatAllGames = require('../controllers/getGamesAll')
const getApiGameById = require('../controllers/getGameById')
const { postGames }  = require('../controllers/postGames')
const { getGamesSearchDb } = require('../controllers/getGamesSearch')

const getGamesHandler = async (req, res) =>{
    const { search } = req.query; 
    try {
        const getGames = search ? await getGamesSearchDb(search) : await concatAllGames();
        res.status(200).json(getGames)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const getGamesIdHandler = async(req, res) =>{
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const getId = await getApiGameById(id, source)
        res.status(200).json(getId)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const  createdGame = async (req, res) =>{
    try {
        const {name, description, genres, released, rating, platforms} = req.body;
        const newGame = await postGames(name, description, genres, released, rating, platforms)
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    

}
module.exports = {getGamesHandler, getGamesIdHandler,  createdGame};