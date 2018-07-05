import React from "react";

// material
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// redux
import { connect } from "react-redux";

export class PList extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      elements: [],
      order: "asc",
      orderBy: "atomic-number"
    };
  }

  componentWillMount() {
    this.setState({ elements: this.props.elements });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.elements !== nextProps.elements) {
      this.setState({ elements: nextProps.elements });
    }
  }

  handleRequestSort = id => {
    const orderBy = id;
    let order = "desc";

    if (this.state.orderBy === id && this.state.order === "desc") {
      order = "asc";
    }

    const elements =
      order === "desc"
        ? this.state.elements.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.elements.sort(
            (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
          );

    this.setState({ elements, order, orderBy });
  };

  getTableHeaders() {
    const tableHeaders = [
      { id: "atomic-number", label: "#", numeric: true },
      { id: "symbol", label: "Symbol", numeric: false },
      { id: "atomic-name", label: "Name", numeric: false },
      { id: "type", label: "Type", numeric: false },
      // { id: "period", label: "Period", numeric: true },
      // { id: "group", label: "Group", numeric: true },
      {
        id: "display-value",
        label: this.props.displayValueText,
        numeric: true
      },
      { id: "melting-point", label: "Melt (K)", numeric: true },
      { id: "boiling-point", label: "Boil (K)", numeric: true },
      { id: "state", label: "State", numeric: false }
    ];
    return (
      <TableHead>
        <TableRow>
          {tableHeaders.map(header => {
            return (
              <TableCell
                key={header.id}
                padding="dense"
                numeric={header.numeric}
              >
                <TableSortLabel
                  active={this.state.orderBy === header.id}
                  direction={this.state.order}
                  onClick={() => this.handleRequestSort(header.id)}
                >
                  {header.label}
                </TableSortLabel>
                {/* Tooltips are causing overflow-x issues */}
                {/* <Tooltip
                  title="Sort"
                  placement={header.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={this.state.orderBy === header.id}
                    direction={this.state.order}
                    onClick={() => this.handleRequestSort(header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </Tooltip> */}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }

  render() {
    return (
      <div className="">
        <Paper id="plist" className="">
          <Table>
            {this.getTableHeaders()}
            <TableBody>
              {this.state.elements
                .filter(element => element.isActive)
                .map(e => {
                  const normalizedType = e["type"]
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                  return (
                    <TableRow key={e["atomic-number"]}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="dense"
                        numeric
                      >
                        {e["atomic-number"]}
                      </TableCell>
                      <TableCell padding="dense">{e.symbol}</TableCell>
                      <TableCell padding="dense">{e["atomic-name"]}</TableCell>
                      <TableCell padding="dense">
                        <span
                          className={`${normalizedType}-border-bottom pb-0`}
                        >
                          {e.type}
                        </span>
                      </TableCell>
                      {/* <TableCell numeric padding="dense">
                        {e.period}
                      </TableCell>
                      <TableCell numeric padding="dense">
                        {e.group}
                      </TableCell> */}
                      <TableCell numeric padding="dense">
                        {e["display-value"]}
                      </TableCell>
                      <TableCell numeric padding="dense">
                        {e["melting-point"]}
                      </TableCell>
                      <TableCell numeric padding="dense">
                        {e["boiling-point"]}
                      </TableCell>
                      <TableCell padding="dense">
                        {e.state}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayValueText: state.ptable.displayValueText,
    elements: state.ptable.elements
  };
};

export default connect(mapStateToProps, null)(PList);
