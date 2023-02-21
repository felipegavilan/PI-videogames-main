const {Router} = require('express')
const {getGamesHandler, getGamesIdHandler, createdGame} = require('../handlers/gamesHandlers')
const gamesRouter = Router();

gamesRouter.get('/', getGamesHandler);

gamesRouter.get('/:id', getGamesIdHandler);

gamesRouter.post('/', createdGame)
module.exports = gamesRouter;