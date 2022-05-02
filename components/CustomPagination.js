import { Pagination } from 'react-bootstrap'

export default function CustomPagination({ page, length, handlePagination, functionScrollToTop }) {
    return (
        <div style={{ width: '100%', textAlign: 'center', display: 'flex' }}>
            <Pagination className="mx-auto" style={{ marginBottom: '75px' }}>
                {page > 0 && <Pagination.First onClick={() => {handlePagination(0); functionScrollToTop()}} />}
                {page > 0 && <Pagination.Prev onClick={() => {handlePagination(page - 20); functionScrollToTop()}} />}
                {page > 0 && <Pagination.Ellipsis />}

                {Array.from({ length: Math.ceil(length / 20) }).map((_, index) => {
                    if ((index * 20) >= page - 80 && (index * 20) <= page + 80) {
                        return (
                            <Pagination.Item
                                key={index}
                                onClick={() => {handlePagination(index * 20); functionScrollToTop()}}
                                active={index * 20 === page}
                                disabled={index * 20 === page}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    }
                })}

                {page < length - 20 && <Pagination.Ellipsis />}
                {page < length - 20 && <Pagination.Next onClick={() => {handlePagination(page + 20); functionScrollToTop()}} />}
                {page < length - 20 && <Pagination.Last onClick={() => {handlePagination(length - 20); functionScrollToTop()}} />}
            </Pagination>
        </div>
    )
}