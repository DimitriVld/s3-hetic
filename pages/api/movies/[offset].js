import { makeQuery } from "../../../db"

export default async function handler(req, res) {
    const offset = parseInt(req.query.offset) || 0
    const limit = 20
    const data = { length: 0, movies: [], error: null }

    try {
        const length = await makeQuery(`SELECT COUNT(*) FROM film`)
        const movies = await makeQuery(`
            SELECT query1.film_id, query1.title, query1.rental_rate, query1.rating, query1.name, query2.count
            FROM
                (
                    SELECT f.film_id, f.title, f.rental_rate, f.rating, c.name
                    FROM film AS f
                    JOIN film_category AS fa ON f.film_id = fa.film_id
                    JOIN category AS c ON c.category_id = fa.category_id
                ) query1
            LEFT JOIN
                (
                    SELECT count(*) AS count, f.title 
                    FROM rental AS r 
                    JOIN inventory AS i ON r.inventory_id = i.inventory_id
                    JOIN film AS f ON f.film_id = i.film_id
                    GROUP BY f.title
                ) query2
            ON query1.title = query2.title
            ORDER BY title
            LIMIT ${limit}
            OFFSET ${offset}
        `)

        const moviesDesc = await makeQuery(`
            SELECT query1.film_id, query1.title, query1.rental_rate, query1.rating, query1.name, query2.count
            FROM
                (
                    SELECT f.film_id, f.title, f.rental_rate, f.rating, c.name
                    FROM film AS f
                    JOIN film_category AS fa ON f.film_id = fa.film_id
                    JOIN category AS c ON c.category_id = fa.category_id
                ) query1
            LEFT JOIN
                (
                    SELECT count(*) AS count, f.title 
                    FROM rental AS r 
                    JOIN inventory AS i ON r.inventory_id = i.inventory_id
                    JOIN film AS f ON f.film_id = i.film_id
                    GROUP BY f.title
                ) query2
            ON query1.title = query2.title
            ORDER BY title DESC 
            LIMIT ${limit}
            OFFSET ${offset}
        `)

        data.length = length[0]['COUNT(*)']
        data.movies = movies.map(movie => {
            const parsedMovie = movie

            return {
                id: parsedMovie.film_id,
                title: parsedMovie.title,
				gendra: parsedMovie.name,
				special_features: parsedMovie.special_features,
				rating: parsedMovie.rating,
				rental_price: parsedMovie.rental_rate,
				rental_count: parsedMovie.count,
			}
        })
        data.moviesDesc = moviesDesc.map(movieDesc => {
            const parsedMovieDesc = movieDesc

            return {
                id: parsedMovieDesc.film_id,
                title: parsedMovieDesc.title,
                gendra: parsedMovieDesc.name,
                special_features: parsedMovieDesc.special_features,
                rating: parsedMovieDesc.rating,
                rental_price: parsedMovieDesc.rental_rate,
                rental_count: parsedMovieDesc.count,
            }
        })
    } catch (error) {
        console.error(error)
        data.error = error
    }

    res.status(200).json({ length: data.length, movies: data.movies, moviesDesc: data.moviesDesc })
}
  