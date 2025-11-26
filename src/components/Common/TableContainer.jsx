import React, { Fragment, useEffect, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";

import {
  // Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";

// Column Filter
const Filter = ({
  column,
  // table
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
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
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      id="search-bar-0"
      className="form-control search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isProductsFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  // New props for server-side pagination
  pagination, // { currentPage, totalPages, totalItems, pageSize }
  onPageChange, // Function to handle page changes
  isLoading = false,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState,
  } = table;

  useEffect(() => {
    customPageSize && setPageSize(customPageSize);
  }, [customPageSize, setPageSize]);

  // Handle server-side pagination
  const handleServerPageChange = (pageIndex) => {
    if (onPageChange && pagination) {
      onPageChange(pageIndex + 1); // Convert to 1-based for server
    } else {
      // Client-side pagination
      setPageIndex(pageIndex);
    }
  };

  const handleServerPrevious = () => {
    console.log("prev clivked", pagination);
    if (onPageChange && pagination) {
      onPageChange(pagination.currentPage - 1);
    } else {
      previousPage();
    }
  };

  const handleServerNext = () => {
    console.log("next clivked", pagination);
    if (onPageChange && pagination) {
      onPageChange(pagination.currentPage + 1);
    } else {
      nextPage();
    }
  };

  // Determine if we can navigate pages
  const canPrevious = pagination
    ? pagination.currentPage > 1
    : getCanPreviousPage();

  const canNext = pagination
    ? pagination.currentPage < pagination.totalPages
    : getCanNextPage();

  // Get current page info
  const currentPageIndex = pagination
    ? pagination.currentPage - 1 // Convert to 0-based for display
    : getState().pagination.pageIndex;

  const totalItems = pagination?.totalItems || data.length;
  const pageSize = pagination?.pageSize || getState().pagination.pageSize;
  const totalPages = pagination?.totalPages || getPageOptions().length;

  // Generate page options for server-side pagination
  const pageOptions = pagination
    ? Array.from({ length: pagination.totalPages }, (_, i) => i)
    : getPageOptions();

  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody className="border border-dashed border-end-0 border-start-0">
            <form>
              <Row>
                <Col sm={5}>
                  <div
                    className={
                      isProductsFilter ||
                      isContactsFilter ||
                      isCompaniesFilter ||
                      isNFTRankingFilter
                        ? "search-box me-2 mb-2 d-inline-block"
                        : "search-box me-2 mb-2 d-inline-block col-12"
                    }
                  >
                    <DebouncedInput
                      value={globalFilter ?? ""}
                      onChange={(value) => setGlobalFilter(value)}
                      placeholder={SearchPlaceholder}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </Col>
                {isProductsFilter && <ProductsGlobalFilter />}
                {isCustomerFilter && <CustomersGlobalFilter />}
                {isOrderFilter && <OrderGlobalFilter />}
                {isContactsFilter && <ContactsGlobalFilter />}
                {isCompaniesFilter && <CompaniesGlobalFilter />}
                {isLeadsFilter && <LeadsGlobalFilter />}
                {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
                {isInvoiceListFilter && <InvoiceListGlobalSearch />}
                {isTicketsListFilter && <TicketsListGlobalFilter />}
                {isNFTRankingFilter && <NFTRankingGlobalFilter />}
                {isTaskListFilter && <TaskListGlobalFilter />}
              </Row>
            </form>
          </CardBody>
        </Row>
      )}

      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={thClass}
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <React.Fragment>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ",
                          desc: " ",
                        }[header.column.getIsSorted()] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </React.Fragment>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              // Loading state
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : getRowModel().rows.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <div className="text-muted">No records found</div>
                </td>
              </tr>
            ) : (
              // Data rows
              getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Simple Pagination - Clean and Effective */}
      <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
        <div className="col-sm">
          <div className="text-muted">
            Showing{" "}
            <span className="fw-semibold">
              {pagination ? data.length : getState().pagination.pageSize}
            </span>{" "}
            of <span className="fw-semibold">{totalItems}</span> Results
          </div>
        </div>
        <div className="col-sm-auto">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light btn-sm"
              onClick={handleServerPrevious}
              disabled={!canPrevious}
            >
              <i className="ri-arrow-left-line me-1"></i> Previous
            </button>

            <span className="text-muted mx-2">
              Page {pagination ? pagination.currentPage : currentPageIndex + 1}{" "}
              of {totalPages}
            </span>

            <button
              className="btn btn-light btn-sm"
              onClick={handleServerNext}
              disabled={!canNext}
            >
              Next <i className="ri-arrow-right-line ms-1"></i>
            </button>
          </div>
        </div>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
