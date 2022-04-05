import { makeQuery } from "../../../db"

export default async function handler(req, res) {
    const offset = req.query.offset || 0
    const limit = offset + 20
    const data = { length: 0, movies: [], error: null }

    try {
        const movies = await makeQuery(`SELECT * FROM film LIMIT ${limit} OFFSET ${offset}`)
        const length = await makeQuery(`SELECT COUNT(*) FROM film`)

        data.length = length[0]['COUNT(*)']
        data.movies = movies.map(movie => {
            const parsedMovie = movie

            return {
				id: parsedMovie.film_id,
				name: parsedMovie.title,
				special_features: parsedMovie.special_features,
				rating: parsedMovie.rating,
				rental_price: parsedMovie.rental_rate,
			}
        })
    } catch (error) {
        console.error(error)
        data.error = error
    }

    res.status(200).json({ length: data.length, movies: data.movies })
}
  