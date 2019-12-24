import React from "react";
import { useTable } from "react-table";
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

  render() {
    const defaultPropGetter = () => ({});

    const Table = ({
      columns,
      data,
      getRowProps = defaultPropGetter,
      getCellProps = defaultPropGetter
    }) => {
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = useTable({
        columns,
        data
      });

      return (
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
                <tr {...row.getRowProps(getRowProps(row))}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps(getCellProps(cell))}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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
      }
    ];

    return (
      <div className="table-data">
        <Table
          columns={columns}
          data={this.state.data}
          getRowProps={row => ({
            onClick: () => console.log("row props", row)
          })}
          getCellProps={cellInfo => ({
            onClick: () => console.log("cell props", cellInfo)
          })}
        />
      </div>
    );
  }
}

export default SnailMail;
