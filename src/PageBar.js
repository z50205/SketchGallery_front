import React from 'react'
import leftIcon from "./icons/left.svg";
import rightIcon from "./icons/right.svg";

const PageBar = ({toPrevPage,toNextPage,page,nextPage}) => {
  return (
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    {page>1 ? 
    <li class="page-item">
        <a class="page-link" onClick={toPrevPage}>Prev</a> 
    </li> :<li class="page-item disabled"> <a class="page-link">Prev</a></li>}
    <li class="page-item"><a class="page-link" href="#">{page}</a></li>
    {nextPage ? 
    <li class="page-item">
        <a class="page-link" onClick={toNextPage}>Next</a> 
    </li> :<li class="page-item disabled"> <a class="page-link">Next</a></li>}
  </ul>
</nav>
  )
}

export default PageBar