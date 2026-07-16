import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";
import { useSearchParams } from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      className="form-control search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const Filter = ({ column }) => (
  <>
    <DebouncedInput
      value={column.getFilterValue() ?? ""}
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Search..."
    />
    <div className="h-1" />
  </>
);

const TableContainer = ({
  columns,
  data,
  isGlobalFilter = false,
  customPageSize = 10,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder = "Search...",
  isLoading = false,
  pageParam = "page",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = useMemo(() => {
    const page = Number(searchParams.get(pageParam));

    if (!page || page < 1) return 0;

    return page - 1;
  }, []);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: initialPage,
    pageSize: customPageSize,
  });

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,

    state: {
      pagination,
      columnFilters,
      globalFilter,
    },

    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,

    filterFns: {
      fuzzy: fuzzyFilter,
    },

    globalFilterFn: fuzzyFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // keep page in range
  useEffect(() => {
    const pageCount = table.getPageCount();

    if (pageCount > 0 && pagination.pageIndex >= pageCount) {
      table.setPageIndex(pageCount - 1);
    }
  }, [data.length]);

  // update URL only when page changes
  useEffect(() => {
    const current = Number(searchParams.get(pageParam) || 1);

    const next = pagination.pageIndex + 1;

    if (current === next) return;

    const params = new URLSearchParams(searchParams);

    params.set(pageParam, String(next));

    setSearchParams(params, { replace: true });
  }, [pagination.pageIndex]);

  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody className="border border-dashed border-end-0 border-start-0">
            <Row>
              <Col sm={5}>
                <div className="search-box me-2 mb-2 d-inline-block col-12">
                  <DebouncedInput
                    value={globalFilter}
                    onChange={setGlobalFilter}
                    placeholder={SearchPlaceholder}
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Row>
      )}

      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={trClass}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={thClass}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                    {header.column.getCanFilter() && (
                      <Filter column={header.column} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <div className="spinner-border text-primary" />
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  No records found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center mt-3">
        <Col>
          <span className="text-muted">
            Showing <strong>{table.getRowModel().rows.length}</strong> of{" "}
            <strong>{data.length}</strong> results
          </span>
        </Col>

        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light btn-sm"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </button>

            <span>
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}
              of <strong>{table.getPageCount()}</strong>
            </span>

            <button
              className="btn btn-light btn-sm"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
