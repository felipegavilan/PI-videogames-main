const getGenres = require('../controllers/getGenres')


const genreController = async(req, res) => {
    try {
        const allGenres = await getGenres();
        console.log(allGenres)
        res.status(200).json(allGenres)   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = genreController