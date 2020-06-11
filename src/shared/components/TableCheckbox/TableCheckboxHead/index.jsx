import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

const TableCheckboxHead = (props) => {
  const {
    head,
    order,
    orderBy,
    haveSort,
    rowCount,
    numSelected,
    onRequestSort,
    onSelectAllClick,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>
        {Object.keys(head).map((headKey, index) => {
          if (haveSort) {
            return (
              <TableCell
                key={headKey}
                padding={index === 0 ? "none" : "default"}
                sortDirection={orderBy === headKey ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headKey}
                  onClick={createSortHandler(headKey)}
                  direction={orderBy === headKey ? order : "asc"}
                >
                  {head[headKey]}
                </TableSortLabel>
              </TableCell>
            );
          }
          return (
            <TableCell key={headKey} padding={index === 0 ? "none" : "default"}>
              {head[headKey]}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableCheckboxHead;
