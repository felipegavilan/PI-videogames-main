
const { Videogame, Genre} = require('../db')

const postGames = async ( name, description, genres, released, rating, platforms ) => {

    const newGame = await Videogame.create({
            name,
            description,
            genres,
            released,
            rating,
            platforms
        });

    genres.forEach(async ele => {
        const [genre] = await Genre.findOrCreate({
            where:{
                name: [ele],
            }
        })
        await newGame.addGenre(genre)
    });
    return newGame
}

module.exports = {postGames}