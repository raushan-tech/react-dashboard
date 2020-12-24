import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../_actions';

function BasicPagination(props) {
  const dispatch = useDispatch();
  const {currentPageNumber, itemsPerPage, totalItems} = useSelector(state => state[props.reducerName]);

  const handleOnChange = (e, newPageNumber) => {
    actions[props.actionName](dispatch)({}, {pageNumber: newPageNumber, itemsPerPage: itemsPerPage})
  };

  return (
    <>
      <Pagination size={"small"} count={parseInt(totalItems/itemsPerPage) + (totalItems%itemsPerPage === 0 ? 0 : 1)}
                  page={currentPageNumber}
                  color="primary" onChange={handleOnChange}/>
    </>
  );
}


export default BasicPagination;