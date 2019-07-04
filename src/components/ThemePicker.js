import React, { useState } from 'react';
import { useContext } from './../context';

// material
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import Brightness2 from '@material-ui/icons/Brightness2';
import BrightnessHigh from '@material-ui/icons/BrightnessHigh';

// material icons
import ChevronRight from '@material-ui/icons/ChevronRight';

// material colors
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const COLORS = [
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
];

export default function ThemePicker() {
  const classes = useStyles();
  const [{ theme }, { setTheme }] = useContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [color1, setColor1] = useState(null);
  const [color2, setColor2] = useState(null);

  const changeType = () => {
    setTheme({
      palette: {
        type: theme.palette.type === 'light' ? 'dark' : 'light',
        primary: theme.palette.primary,
        secondary: theme.palette.secondary,
        error: theme.palette.error,
        contrastThreshold: 3,
      },
    });
  };

  const changeColors = (primary, secondary) => {
    let newTheme = { ...theme };

    // set new colors
    newTheme.palette.primary = primary;
    newTheme.palette.secondary = secondary;

    setTheme(newTheme);
  };

  const handleCancel = () => {
    setColor1(null);
    setColor2(null);
    setDialogOpen(false);
  };

  const handleOk = () => {
    changeColors(color1, color2);
    setColor1(null);
    setColor2(null);
    setDialogOpen(false);
  };

  const selectColor = color => {
    if (!color1) {
      setColor1(color);
    } else if (!color2) {
      setColor2(color);
    }
  };

  const colorPreviews = (
    <div className={classes.colorPreviews}>
      {COLORS.map((color, i) => {
        return (
          <div key={i} className={classes.colorPreview}>
            <ButtonBase
              onClick={() => selectColor(color)}
              style={{ backgroundColor: color[500] }}
              className={classes.colorPreviewCircle}
            />
          </div>
        );
      })}
    </div>
  );

  const selectedColors = (
    <div className={classes.selectedColors}>
      <div className={classes.selectedColorInner}>
        <div
          className={classes.colorPreviewCircleLeft}
          style={{ backgroundColor: theme.palette.primary[500] }}
        />
        <div
          className={classes.colorPreviewCircleRight}
          style={{
            backgroundColor: theme.palette.secondary[500],
          }}
        />
      </div>
      <div className={classes.selectedColorInner}>
        <Typography>
          <ChevronRight size="small" />
        </Typography>
      </div>
      <div className={classes.selectedColorInner}>
        <ButtonBase
          onClick={() => setColor1('')}
          className={classes.colorPreviewCircleLeft}
          style={{ backgroundColor: color1 ? color1[500] : '' }}
        />
        <ButtonBase
          onClick={() => setColor2('')}
          className={classes.colorPreviewCircleRight}
          style={{ backgroundColor: color2 ? color2[500] : '' }}
        />
      </div>
      <div />
    </div>
  );

  return (
    <div>
      <IconButton onClick={changeType} color="primary">
        {theme.palette.type === 'light' ? <Brightness2 /> : <BrightnessHigh />}
      </IconButton>
      <Button
        variant="outlined"
        onClick={() => setDialogOpen(true)}
        color="secondary"
      >
        Pick Colors
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={dialogOpen}
        classes={{ paper: 'colors-dialog' }}
      >
        <DialogTitle id="simple-dialog-title">
          {!color1
            ? 'Select Primary Color Scheme'
            : 'Select Secondary Color Scheme'}
        </DialogTitle>
        <DialogContent>
          <div className={classes.colorsDialogContent}>
            {colorPreviews}
            {selectedColors}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button
            disabled={!color1 || !color2}
            variant="contained"
            onClick={handleOk}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  colorsDialog: {
    maxWidth: 225,
  },
  colorsDialogContent: {
    maxWidth: 125,
    margin: '0 auto',
  },
  colorPreviews: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  colorPreview: {
    width: '25%',
    padding: '0.15rem',
  },
  colorPreviewCircle: {
    height: 26,
    width: '100%',
    borderRadius: '100%',
  },
  colorPreviewCircleLeft: {
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 'calc(26px/2)',
    height: 26,
  },
  colorPreviewCircleRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: 'calc(26px/2)',
    height: 26,
  },
  selectedColors: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  selectedColorInner: {
    width: '25%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
