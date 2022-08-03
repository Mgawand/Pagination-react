// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react'

// const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

//     const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

//     const nextPage = () => {
//             if(currentPage !== nPages) setCurrentPage(currentPage + 1)
//     }
//     const prevPage = () => {
//         if(currentPage !== 1) setCurrentPage(currentPage - 1)
//     }
//     return (
//         <nav>
//             <ul className='pagination justify-content-center'>
//                 <li className="page-item">
//                     <a className="page-link" onClick={prevPage} href='#'>Previous</a>
//                 </li>
//                 {pageNumbers.map(pgNumber => (
//                     <li key={pgNumber} 
//                         className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

//                         <a onClick={() => setCurrentPage(pgNumber)}  
//                             className='page-link' 
//                             href='#'>
                            
//                             {pgNumber}
//                         </a>
//                     </li>
//                 ))}
//                 <li className="page-item">
//                     <a className="page-link" 
//                         onClick={nextPage}
//                         href='#'>
                        
//                         Next
//                     </a>
//                 </li>
//             </ul>
//         </nav>
//     )
// }

// export default Pagination

import React, { useState, useEffect, useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationPage = ({total= 0, perPage= 10, currentPage=1, onPageChange  }) => {
  const[totalPages, setTotalPages] = useState(0);
  useEffect(()=> {
    if (total > 0 && perPage >0 )
    setTotalPages(Math.ceil(total / perPage))
  }, [total, perPage])

  const paginationItems = useMemo(()=> {
    const pages = [];
    for (let i = 1; i <= totalPages; i++ ){
      pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i) }>{i}
      </Pagination.Item >
      )
    }
    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;
    
  
  return (

   <Pagination>
      <Pagination.Prev onClick={() => onPageChange (currentPage -1)} disabled={currentPage === 1}/>
      {paginationItems}
      <Pagination.Next onClick={() => onPageChange (currentPage + 1)} disabled={currentPage === totalPages}/>
    </Pagination>
  );
}
export default PaginationPage;

