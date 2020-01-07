import React from "react";
import axios from "axios";
import "../style.scss";
import { toast } from "react-toastify";
import ComplaintTable from "../ComplaintTable";
import { connect } from "react-redux";
import Loading from "../../../Utils/Loading";
import { DATA_LOADED, DATA_LOADING } from "../../../Store/type";
import { SERVER_URL } from "../../../Utils/constants";
class ResolveComplaint extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.props.dispatch({ type: DATA_LOADING });
    axios
      .post(`${SERVER_URL}/complaint`, {
        query: { isValid: false, isResolve: true }
      })
      .then(res => {
        this.setState({
          data: res.data
        });
        this.props.dispatch({ type: DATA_LOADED });
      })
      .catch(err => {
        if (typeof err.response !== undefined) {
          toast.error(`Unable to fetch the data!..`);
        } else {
          toast.error(`${err.response.data.message}`);
        }
        this.props.dispatch({ type: DATA_LOADED });
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
      }
    ];

    return (
      <div className="table-data" style={this.props.styled}>
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <ComplaintTable columns={columns} data={this.state.data} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading.isLoading
});

export default connect(mapStateToProps)(ResolveComplaint);
