import React, { useState } from 'react'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import { CustomPagination, MoviesTable } from '../components'
import axios from 'axios'

export async function getStaticProps() {
	try {
		const { data } = await axios.get(`${process.env.APP_DOMAIN}/api/movies/0`)
		return { props: { ...data } }
	} catch (error) {
		console.error(error)
	}

	return {
		props: {
			length: 0,
			movies: []
		},
	}
}

export default function Home({ movies, moviesDesc, length }) {
	const [data, setData] = useState(movies)
	const [page, setPage] = useState(0)
	const [filter, setFilter] = useState(false);

	const filterByName = () => {
		if (!filter) {
			setData(moviesDesc)
			setFilter(true)
			setPage(0)
		} else {
			setData(movies)
			setFilter(false)
			setPage(0)
		}
	}

	const handlePagination = async (page) => {
		setPage(page)
		const { data } = await axios.get(`/api/movies/${page}`)

		if (!filter) {
			setData(data.movies)
		} else {
			setData(data.moviesDesc)
		}
	}

	const scrollTop = () => {
		window.scrollTo(0, 0)
	}

	return (
		<div>
			<Head>
				<title>S3 project - Dimitri Vildina</title>
				<meta name="description" content="Description S3 Project" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container style={{ marginTop: '50px' }}>
				<h1>Liste des films</h1>
				<p>Total : {length} films</p>
				<MoviesTable
					data={data}
					functionFilter={filterByName}
				/>
				<CustomPagination
					page={page}
					length={length}
					handlePagination={handlePagination}
					functionScrollToTop={scrollTop}
				/>
			</Container>
		</div>
	)
}
