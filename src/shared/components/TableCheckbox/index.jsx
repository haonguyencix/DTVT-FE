import React, { useState, Fragment } from "react";
import styles from "./styles.module.scss";
import TableCheckboxHead from "./TableCheckboxHead";
import {
  Checkbox,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const TableCheckbox = ({ rows, head, primaryKey, renderBtnSubmit, haveSort }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = rows.map((n) => n[primaryKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, primaryKey) => {
    const selectedIndex = selected.indexOf(primaryKey);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, primaryKey);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (primaryKey) => selected.indexOf(primaryKey) !== -1;

  return (
    <Fragment>
      <TableContainer component={Paper} className={styles.TableContainer}>
        <Table>
          <TableCheckboxHead
            head={head}
            order={order}
            orderBy={orderBy}
            haveSort={haveSort}
            rowCount={rows.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row[primaryKey] || "Lỗi");

                return (
                  <TableRow
                    hover
                    key={row[primaryKey] || index}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    onClick={(e) => handleClick(e, row[primaryKey] || "Lỗi")}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>

                    {Object.values(row).map((v, i) => (
                      <TableCell key={i} padding={i === 0 ? "none" : "default"}>
                        {v}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {renderBtnSubmit(selected)}
    </Fragment>
  );
};

export default TableCheckbox;
