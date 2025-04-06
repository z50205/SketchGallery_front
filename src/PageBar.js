import React from 'react'
import leftIcon from "./icons/left.svg";
import rightIcon from "./icons/right.svg";

const PageBar = ({toPrevPage,toNextPage,page,nextPage}) => {
  return (
<nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    {page>1 ? 
    <li className="page-item">
        <a className="page-link" onClick={toPrevPage}>Prev</a> 
    </li> :<li className="page-item disabled"> <a className="page-link">Prev</a></li>}
    <li className="page-item"><a className="page-link" href="#">{page}</a></li>
    {nextPage ? 
    <li className="page-item">
        <a className="page-link" onClick={toNextPage}>Next</a> 
    </li> :<li className="page-item disabled"> <a className="page-link">Next</a></li>}
  </ul>
</nav>
  )
}

export default PageBar