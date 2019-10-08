import React, { useState, useEffect } from 'react';
import { useContext } from '../context';

// material
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';

export default function List() {
  const classes = useStyles();
  const [{ elements, displayValueText }] = useContext();

  const [displayedElements, setDisplayedElements] = useState(elements);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('atomic-number');
  const [tableHeaders, setTableHeaders] = useState([]);

  const handleRequestSort = newOrderBy => {
    setOrderBy(newOrderBy);

    let newOrder = 'desc';
    if (orderBy === newOrderBy && order === 'desc') {
      newOrder = 'asc';
    }
    setOrder(newOrder);

    setDisplayedElements(
      newOrder === 'desc'
        ? elements.sort((a, b) => (b[newOrderBy] < a[newOrderBy] ? -1 : 1))
        : elements.sort((a, b) => (a[newOrderBy] < b[newOrderBy] ? -1 : 1)),
    );
  };

  useEffect(() => {
    setTableHeaders([
      { id: 'atomic-number', label: '#', numeric: true },
      { id: 'symbol', label: 'Symbol', numeric: false },
      { id: 'atomic-name', label: 'Name', numeric: false },
      { id: 'type', label: 'Type', numeric: false },
      {
        id: 'display-value',
        label: displayValueText,
        numeric: true,
      },
      { id: 'melting-point', label: 'Melt (K)', numeric: true },
      { id: 'boiling-point', label: 'Boil (K)', numeric: true },
      { id: 'state', label: 'State', numeric: false },
    ]);
  }, [displayValueText]);

  return (
    <div>
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => {
                return (
                  <TableCell
                    key={header.id}
                    align={header.numeric ? 'right' : 'left'}
                  >
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={order}
                      onClick={() => handleRequestSort(header.id)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedElements
              .filter(element => element.isActive)
              .map(e => {
                const normalizedType = e['type']
                  .replace(/\s+/g, '-')
                  .toLowerCase();
                return (
                  <TableRow key={e['atomic-number']}>
                    <TableCell align="right">{e['atomic-number']}</TableCell>
                    <TableCell>{e.symbol}</TableCell>
                    <TableCell>{e['atomic-name']}</TableCell>
                    <TableCell>
                      <span className={`${normalizedType}-border-bottom pb-0`}>
                        {e.type}
                      </span>
                    </TableCell>
                    <TableCell align="right">{e['display-value']}</TableCell>
                    <TableCell align="right">{e['melting-point']}</TableCell>
                    <TableCell align="right">{e['boiling-point']}</TableCell>
                    <TableCell>{e.state}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  table: {
    backgroundColor: theme.palette.background.paper,
  },
}));
