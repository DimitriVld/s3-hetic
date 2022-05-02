import { Table } from 'react-bootstrap'

export default function MoviesTable({ data, functionFilter }) {
    return (
        <Table striped bordered hover style={{ margin: '50px 0' }}>
            <thead>
                <tr>
                    <th onClick={() => functionFilter()} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                        Nom
                        <svg focusable="false"
                             aria-hidden="true"
                             viewBox="0 0 24 24"
                        style={{ width: '34px' }}>
                            <path d="m7 14 5-5 5 5z"></path>
                        </svg>
                        <svg focusable="false"
                             aria-hidden="true"
                             viewBox="0 0 24 24"
                             style={{ width: '34px' }}>
                            <path d="m7 10 5 5 5-5z"></path>
                        </svg>
                    </th>
                    <th>Type</th>
                    <th>Évaluation</th>
                    <th>Prix de la location</th>
                    <th>Montant de la location</th>
                </tr>
            </thead>
            <tbody>
                {data.map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.gendra}</td>
                        <td>{movie.rating}</td>
                        <td>{`${movie.rental_price} €`}</td>
                        <td>{movie.rental_count}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}