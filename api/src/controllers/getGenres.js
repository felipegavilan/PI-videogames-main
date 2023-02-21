const axios = require('axios');
const { Genre } = require('../db')

const getGenres = async () => {

    const genresAll = await axios.get('https://api.rawg.io/api/genres?key=54766e541f1c4010839553c6c72eadee')

    const generes = genresAll.data.results.map(async gen => {
        const genres = await Genre.findOrCreate({
            where: { 
                name: [gen.name],
            }
        })
        return genres
    })
    let result = await Genre.findAll()
    return result
}


module.exports = getGenres