import { Table } from 'react-bootstrap'

export default function MoviesTable({ data }) {
    return (
        <Table style={{ margin: '50px 0' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gendra</th>
                    <th>Rating</th>
                    <th>Rental price</th>
                    <th>Rentals amount</th>
                </tr>
            </thead>
            <tbody>
                {data.map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.name}</td>
                        <td>{movie.special_features}</td>
                        <td>{movie.rating}</td>
                        <td>{`${movie.rental_price} $`}</td>
                        <td>TBD</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}