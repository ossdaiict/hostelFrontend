import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import "./style.scss";

class SnailMail extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    const snailData = require("./fakeData");
    this.setState({
      data: snailData.default
    });
  }

  handleDelete = rowProps => {
    console.log(rowProps);
  };

  render() {
    const defaultPropGetter = () => ({});

    const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
      return (
        <span
          style={{ margin: "1rem", display: "block", fontSize: "1.6rem" }}
          className="form__label"
        >
          Search:{" "}
          <input
            value={globalFilter || ""}
            onChange={e => {
              setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder="Search..."
            className="form__input"
          />
        </span>
      );
    };

    const Table = ({ columns, data, getCellProps = defaultPropGetter }) => {
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter
      } = useTable(
        {
          columns,
          data
        },
        useGlobalFilter
      );

      return (
        <>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps([
                        {
                          className: column.className,
                          style: column.style
                        }
                      ])}
                    >
                      {/* {console.log(this.props.isAdmin)} */}
                      {!this.props.isAdmin
                        ? column.id === "action"
                          ? column.toggleHidden()
                          : null
                        : null}
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
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
            </tbody>
          </table>
        </>
      );
    };
    const columns = [
      {
        Header: "Student ID",
        accessor: "sid"
      },
      {
        Header: "Name",
        accessor: "title"
      },
      {
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "Courier Name",
        accessor: "ccompany"
      },
      {
        Header: "Courier ID",
        accessor: "cnumber"
      },
      {
        Header: "Room No.",
        accessor: "roomno"
      },
      {
        Header: "Given By",
        accessor: "givenby"
      },
      {
        Header: "Type",
        accessor: "type"
      },
      {
        Header: "Action",
        id: "action",
        Cell: () => <button>Delete</button>,
        isAuth: true
      }
    ];

    return (
      <div className="table-data">
        <Table
          columns={columns}
          data={this.state.data}
          getCellProps={cell => ({
            onClick: () => this.handleDelete(cell.row.original.sid)
          })}
        />
      </div>
    );
  }
}

export default SnailMail;
