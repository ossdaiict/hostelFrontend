import React from "react";
import { useTable, useFilters } from "react-table";
import axios from "axios";
import "./style.scss";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { toast } from "react-toastify";

class Complaint extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios
      .post("http://localhost:5000/complaint", {
        query: { isResolve: false }
      })
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handleData(rowsProp) {
  //   rowsProp.map(row => {
  //     console.log(row.original);
  //   });
  // }

  handleResolve(cellProp) {
    const { _id, sID } = cellProp.row.original;
    console.log(_id, sID);
    axios
      .post("http://localhost:5000/complaint/resolve", { _id, sID })
      .then(res => {
        this.setState({
          data: this.state.data.filter(complaint => {
            return !(complaint.sID === sID && complaint._id === _id);
          })
        });
        toast.info(`${res.data.message}`);
      })
      .catch(err => {
        toast.error(`${err.response.data.message}`);
      });
  }

  render() {
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

    const SelectColumnFilter = ({
      column: { filterValue, setFilter, preFilteredRows, id }
    }) => {
      const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
          options.add(row.values[id]);
        });
        return [...options.values()];
      }, [id, preFilteredRows]);

      return (
        <select
          value={filterValue}
          className="form__input"
          style={{
            width: "11rem",
            height: "3.5rem",
            fontSize: "1.35rem",
            padding: "0.8rem"
          }}
          onChange={e => {
            setFilter(e.target.value || undefined);
          }}
        >
          <option value="">All</option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
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
    const columns = [
      {
        Header: "Student ID",
        accessor: "sID"
      },
      {
        Header: "Date",
        accessor: "initialDate"
      },
      {
        Header: "Wing",
        accessor: "wing",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Room",
        accessor: "room"
      },
      {
        Header: "Type",
        accessor: "type",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Complaint",
        accessor: "complaint"
      },
      {
        Header: "Re-Open Date",
        accessor: "reOpenDate"
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => <button className="button__resolve">Resolve</button>
      }
    ];

    return (
      <div className="table-data" style={this.props.styled}>
        <Table
          columns={columns}
          data={this.state.data}
          getCellProps={cell => ({
            onClick: () => this.handleResolve(cell)
          })}
        />
      </div>
    );
  }
}

export default Complaint;
