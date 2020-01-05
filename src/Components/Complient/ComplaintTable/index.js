import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useTable, useFilters } from "react-table";

const ComplaintTable = props => {
  const { columns, data, getCellProps } = props;

  const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
      <input
        value={filterValue || ""}
        className="form__input"
        style={{ width: "12rem", height: "3.5rem" }}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search...`}
      />
    );
  };

  let defaultPropGetter = () => ({});

  const Table = ({
    columns,
    data,
    getBodyProps = defaultPropGetter,
    getCellProps = defaultPropGetter
  }) => {
    const filterTypes = React.useMemo(
      () => ({
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        }
      }),
      []
    );

    const defaultColumn = React.useMemo(
      () => ({
        Filter: DefaultColumnFilter
      }),
      []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes
      },
      useFilters
    );

    return (
      <>
        <table id="table-to-xls" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {column.id !== "action"
                        ? column.canFilter
                          ? column.render("Filter")
                          : null
                        : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps(getBodyProps(rows))}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    let cellProps = props =>
                      props.column.id === "action" ? getCellProps(props) : {};
                    return (
                      <td {...cell.getCellProps(cellProps(cell))}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* <button
                className="login-form__submit"
                onClick={() => this.handleData(rows)}
                style={{ margin: "2rem" }}
              >
                Export data
              </button> */}
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="login-form__submit"
              table="table-to-xls"
              filename="Complaints"
              sheet="tablexls"
              buttonText="Export data"
            />
          </tbody>
        </table>
        <br />
      </>
    );
  };

  return <Table columns={columns} data={data} getCellProps={getCellProps} />;
};

export default ComplaintTable;
