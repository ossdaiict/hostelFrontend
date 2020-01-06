import React from "react";
import axios from "axios";
import "./style.scss";
import { toast } from "react-toastify";
import ComplaintTable from "./ComplaintTable";
import { connect } from "react-redux";

class Complaint extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    let query;

    if (this.props.user.isSupervisor) {
      query = {
        isValid: true
      };
    } else if (this.props.user.isHMC) {
      query = {
        isValid: true,
        wing: this.props.user.wing
      };
    } else {
      query = { isValid: true, sID: this.props.user.sID };
    }

    axios
      .post("http://localhost:5000/complaint", { query })
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        if (typeof err.response !== undefined) {
          toast.error(`Unable to fetch the data!..`);
        } else {
          toast.error(`${err.response.data.message}`);
        }
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
        if (typeof err.response !== undefined) {
          toast.error(`Unable to resolve!..`);
        } else {
          toast.error(`${err.response.data.message}`);
        }
      });
  }

  render() {
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
        <ComplaintTable
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

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Complaint);
