"use client"

import { useState } from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ pageCount,handlePageClick }: any) => {
  const [stateData, setStateData] = useState({
    offset: 0,
    data: [],
    perPage: 5,
    currentPage: 0
  })
  return (
    <div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        // subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
    </div>
  )
}

export default Pagination