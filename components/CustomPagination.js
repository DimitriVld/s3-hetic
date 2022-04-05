import { Pagination, Row } from 'react-bootstrap'

export default function CustomPagination({ page, length, handlePageChange }) {
    return (
        <div style={{ width: '100%', textAlign: 'center', display: 'flex' }}>
            <Pagination className="mx-auto" style={{ marginBottom: '75px' }}>
                {page > 0 && <Pagination.First onClick={() => handlePageChange(0)} />}
                {page > 0 && <Pagination.Prev onClick={() => handlePageChange(page - 20)} />}
                {page > 0 && <Pagination.Ellipsis />}

                {Array.from({ length: Math.ceil(length / 20) }).map((_, index) => {
                    if ((index * 20) >= page - 80 && (index * 20) <= page + 80) {
                        return (
                            <Pagination.Item
                                key={index}
                                onClick={() => handlePageChange(index * 20)}
                                active={index * 20 === page}
                                disabled={index * 20 === page}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    }
                })}

                {page < length - 20 && <Pagination.Ellipsis />}
                {page < length - 20 && <Pagination.Next onClick={() => handlePageChange(page + 20)} />}
                {page < length - 20 && <Pagination.Last onClick={() => handlePageChange(length - 20)} />}
            </Pagination>
        </div>
    )
}