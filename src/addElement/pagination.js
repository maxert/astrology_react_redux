import React from "react";
import { Pagination } from "semantic-ui-react";

function PaginationExamplePagination({
  listpagedefault,
  listPageAll,
  SelectPagination
}) {
  return (
    <Pagination
      defaultActivePage={listpagedefault}
      totalPages={listPageAll!==undefined?listPageAll:1}
      onPageChange={SelectPagination}
    />
  );
}

export default PaginationExamplePagination;
