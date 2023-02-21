const { Router } = require('express');
const genreRoutes = Router();
const genreController = require('../handlers/genresHandlers')

genreRoutes.get('/', genreController)

module.exports = genreRoutes;