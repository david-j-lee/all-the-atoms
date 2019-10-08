import React, { useState, useEffect, useRef } from 'react';
import { useContext } from './../context';

// material
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

export default function Type({ type }) {
  const classes = useStyles();
  const [{ search }, { searchElements }] = useContext();

  const [isActive, setIsActive] = useState(false);
  const searchTerm = useRef(`type: ${type['name-plural']}`);
  const className = useRef(
    type['name-plural'].replace(/\s+/g, '-').toLowerCase(),
  );

  const searchByType = () => {
    if (isActive) {
      searchElements('');
      setIsActive(false);
    } else {
      searchElements(searchTerm.current);
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (search.toLowerCase() !== searchTerm.current.toLowerCase()) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [search]);

  return (
    <button
      onClick={searchByType}
      className={[
        classes.root,
        'legend-item',
        className.current + '-bg',
        isActive ? 'active' : 'inactive',
      ].join(' ')}
    >
      <div
        className={[
          'legend-item-content',
          className.current + '-border-bottom',
        ].join(' ')}
      >
        <Typography variant="body2" color="textPrimary">
          {type['name-plural']}
        </Typography>
      </div>
    </button>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 5px 5px 5px',
    padding: '1px 3px',
    fontWeight: 400,
    border: 'none',
  },
  content: {
    padding: '0 3px',
  },
}));
