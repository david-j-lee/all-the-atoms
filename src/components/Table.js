import React from 'react';
import { useContext } from '../context';

// material
import { makeStyles } from '@material-ui/styles';

// data
import gridMapData from '../data/grid-map.json';
import groupData from '../data/groups.json';
import periodData from '../data/periods.json';
import typeData from '../data/types.json';

// components
import Element from '../components/Element';
import Empty from '../components/Empty';
import Group from '../components/Group';
import Period from '../components/Period';
import Placeholder from '../components/Placeholder';
import Type from '../components/Type';

export default function Table() {
  const classes = useStyles();
  const [{ search, elements }] = useContext();

  const getTileType = map => {
    let type = 'empty';
    if (typeof map === 'number') {
      type = 'element';
    } else if (typeof map === 'string') {
      if (map === '') {
        type = 'empty';
      } else if (map.indexOf('g') !== -1) {
        type = 'group';
      } else if (map.indexOf('p') !== -1) {
        type = 'period';
      } else if (map === 'l' || map === 'a') {
        type = 'placeholder';
      }
    }
    return type;
  };

  const getElement = (elements, map) => {
    return elements.find(e => e['atomic-number'] === map);
  };

  const getGroup = map => {
    return groupData.find(g => g.number.toString() === map.replace('g', ''));
  };

  const getPeriod = map => {
    return periodData.find(p => p.number.toString() === map.replace('p', ''));
  };

  const getPlaceholderStatus = (map, search) => {
    if (search) {
      const terms = search.toLowerCase().split(':');
      if (terms[0] === 'type') {
        switch (map) {
          case 'l':
            return terms[1].trim().indexOf('lanthanoid') !== -1;
          case 'a':
            return terms[1].trim().indexOf('actinoid') !== -1;
          default:
            return false;
        }
      }
    } else {
      return true;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.pTable}>
        <div className={classes.pTableItems}>
          {gridMapData.map((map, index) => {
            switch (getTileType(map)) {
              case 'element':
                const element = getElement(elements, map);
                return <Element key={index} element={{ ...element }} />;
              case 'group':
                return <Group key={index} group={getGroup(map)} />;
              case 'period':
                return <Period key={index} period={getPeriod(map)} />;
              case 'placeholder':
                return (
                  <Placeholder
                    key={index}
                    type={map}
                    isActive={getPlaceholderStatus(map, search)}
                  />
                );
              default:
                return <Empty key={index} />;
            }
          })}
        </div>
      </div>
      <div className={classes.legend}>
        {typeData.map((a, i) => (
          <Type key={i} type={a} />
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  pTable: {
    overflow: 'auto',
    paddingBottom: '15px',
    overflowX: 'auto',
  },
  pTableItems: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '950px',
  },
  legend: {
    marginTop: 25,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));
