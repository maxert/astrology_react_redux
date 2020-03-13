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
      totalPages={listPageAll}
      onPageChange={SelectPagination}
    />
  );
}

export default PaginationExamplePagination;
