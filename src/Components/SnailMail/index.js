import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import "./style.scss";
import { toast } from "react-toastify";

import axios from "axios";

class SnailMail extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    // const data = require("./fakeData");
    // console.log(data.default);

    // this.setState({
    //   data: data.default
    // });
    axios
      .get("http://localhost:5000/courier")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        if (typeof err.response !== undefined) {
          toast.error(`Unable to fetch the snails!..`);
        } else {
          toast.error(`${err.response.data.message}`);
        }
      });
  }

  handleDelete = (sID, cID) => {
    axios
      .post("http://localhost:5000/courier/delete", { sID, cID })
      .then(res => {
        this.setState({
          data: this.state.data.filter(courier => {
            return !(courier.sID === sID && courier.cID === cID);
          })
        });
        toast.info(`${res.data.message}`);
      })
      .catch(err => {
        if (typeof err.response !== undefined) {
          toast.error(`Unable to delete the snail!..`);
        } else {
          toast.error(`${err.response.data.message}`);
        }
      });
    // let newData = this.state.data.filter(courier => {
    //   return !(courier.sid === sID && courier.cnumber === cID);
    // });
    // console.log(newData, cID, sID);
    // this.setState({
    //   data: newData
    // });
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
        accessor: "sID"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Date",
        accessor: "cdate"
      },
      {
        Header: "Courier Name",
        accessor: "service"
      },
      {
        Header: "Courier ID",
        accessor: "cID"
      },
      {
        Header: "Room No.",
        accessor: "room"
      },
      {
        Header: "Given By",
        accessor: "givenBy"
      },
      {
        Header: "Type",
        accessor: "type"
      },
      {
        Header: "Action",
        id: "action",
        Cell: () => <button className="button__delete">Delete</button>,
        isAuth: true
      }
    ];

    return (
      <div className="table-data" style={this.props.styled}>
        <Table
          columns={columns}
          data={this.state.data}
          getCellProps={cell => ({
            onClick: () =>
              this.handleDelete(cell.row.original.sID, cell.row.original.cID)
          })}
        />
      </div>
    );
  }
}

export default SnailMail;
