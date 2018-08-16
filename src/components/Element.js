import React from 'react';

// redux
import { connect } from 'react-redux';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
  root: {
    width: 'calc(100% / 18 - 15px / 18)',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  body: {
    margin: 1,
    padding: 4,
    cursor: 'pointer',
    flexGrow: 1,
  },
  info: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: 1.3,
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.25,
  },
  elementState: {
    marginLeft: 'auto',
  },
  atomicNumber: {
    fontSize: '9pt',
    display: 'flex',
  },
  symbol: {
    fontSize: '12pt',
    fontWeight: 'bold',
  },
  atomicName: {
    fontSize: '9pt',
  },
  displayValue: {
    fontSize: '9pt',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverHeader: {
    padding: theme.spacing.unit * 1.5,
  },
  popoverContent: {
    padding: theme.spacing.unit * 1.5,
  },
  header: {
    width: 125,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  points: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export class Element extends React.Component {
  constructor(props) {
    super(props);

    this.anchorEl = React.createRef();
    this.state = {
      popoverOpen: false,
    };
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target, popoverOpen: true });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null, popoverOpen: false });
  };

  togglePopover = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };

  render() {
    const { classes, element, displayValueText } = this.props;
    const { popoverOpen } = this.state;

    const normalizedType = element['type'].replace(/\s+/g, '-').toLowerCase();
    const elementClassName = `${normalizedType}-bg group-${
      element['group']
    } period-${element['period']}`;

    // show element state if it exists
    // the state is set when a temperature is set
    let State = '';
    if (element.state !== undefined) {
      let icon = '';
      switch (element.state) {
        case 'solid':
          icon = 'circle';
          break;
        case 'liquid':
          icon = 'tint';
          break;
        case 'gas':
          icon = 'cloud';
          break;
        default:
          break;
      }
      State = <FontAwesomeIcon icon={icon} size="xs" />;
    }

    let Points = '';
    if (element['melting-point'] || element['boiling-point']) {
      Points = (
        <Grid container className={classes.points}>
          <Grid item md={6}>
            <FontAwesomeIcon
              icon="tint"
              size="xs"
              className={`${normalizedType}-text`}
            />{' '}
            <span className="">
              <Typography>{element['melting-point-converted']}</Typography>
            </span>
          </Grid>
          <Grid item md={6}>
            <FontAwesomeIcon
              icon="cloud"
              size="xs"
              className={`${normalizedType}-text`}
            />{' '}
            <span className="">
              <Typography>{element['boiling-point-converted']}</Typography>
            </span>
          </Grid>
        </Grid>
      );
    }

    return (
      <button
        ref={this.anchorEl}
        className={classes.root}
        id={'Popover-' + element.symbol}
        onClick={this.togglePopover}
        onMouseOver={this.handlePopoverOpen}
        onMouseOut={this.handlePopoverClose}
      >
        {/* set if active here */}
        <div
          className={[
            classes.body,
            elementClassName,
            element.isActive ? classes.active : classes.inactive,
          ].join(' ')}
        >
          <div className={classes.info}>
            <div className={classes.atomicNumber}>
              <span>{element['atomic-number']}</span>
              <span className={classes.elementState}>{State}</span>
            </div>
            <div className={classes.symbol}>{element['symbol']}</div>
            <Hidden mdDown className={[classes.atomicName].join(' ')}>
              {element['atomic-name']}
            </Hidden>
            <div className={classes.displayValue}>
              {element['display-value']}
            </div>
          </div>
        </div>

        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={popoverOpen}
          anchorEl={this.anchorEl.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <div className={`${normalizedType}-bg`}>
            <Typography
              color="inherit"
              variant="title"
              className={classes.popoverHeader}
            >
              {element['atomic-name']}
            </Typography>
          </div>
          <div className={classes.popoverContent}>
            <table>
              <tbody>
                <tr className={classes.popoverItem}>
                  <td className={classes.header}>
                    <Typography>Atomic Number</Typography>
                  </td>
                  <td className={classes.textRight}>
                    <Typography>{element['atomic-number']}</Typography>
                  </td>
                </tr>
                <tr className={classes.popoverItem}>
                  <td className={classes.header}>
                    <Typography>Symbol</Typography>
                  </td>
                  <td className={classes.textRight}>
                    <Typography>{element['symbol']}</Typography>
                  </td>
                </tr>
                <tr className={classes.popoverItem}>
                  <td className={classes.header}>
                    <Typography>Type</Typography>
                  </td>
                  <td className={`${normalizedType}-border-bottom`}>
                    <Typography>{element['type']}</Typography>
                  </td>
                </tr>
                <tr className={classes.popoverItem}>
                  <td className={classes.header}>
                    <Typography>{displayValueText}</Typography>
                  </td>
                  <td className={classes.textRight}>
                    <Typography>{element['display-value']}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
            {Points}
          </div>
        </Popover>
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.ptable.theme,
    displayValue: state.ptable.displayValue,
    displayValueText: state.ptable.displayValueText,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Element));
