import React from 'react';
import { Pagination } from '@carbon/react';

const DatagridPagination = ({ state, setPageSize, gotoPage, rows }) => {
  const updatePagination = ({ page, pageSize }) => {
    console.log(state);
    setPageSize(pageSize);
    gotoPage(page - 1);  
  };

  return (
    <Pagination
      page={state.pageIndex + 1}  
      pageSize={state.pageSize}
      pageSizes={state.pageSizes || [10, 20, 30, 40, 50]}
      totalItems={rows.length}
      onChange={updatePagination}
    />
  );
};
 
export default DatagridPagination;
  