import React from "react";
import "./ThemePicker.css";

// redux
import { connect } from "react-redux";
import { getTheme, setTheme } from "../../Actions/ptableAction";

// material
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Brightness2 from "@material-ui/icons/Brightness2";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";

// material icons
import ChevronRight from "@material-ui/icons/ChevronRight";

// material colors
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { ButtonBase } from "@material-ui/core";

export class ThemePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      theme: {},
      dialogOpen: false,
      color1: "",
      color2: ""
    };
  }

  componentWillMount() {
    this.props.getTheme();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ theme: nextProps.theme });
    this.updateButton(nextProps.theme.palette.type);
  }

  changeType = () => {
    let newTheme = { ...this.state.theme };
    const newType = newTheme.palette.type === "light" ? "dark" : "light";

    // set theme
    newTheme.palette.type = newType;
    this.props.setTheme(newTheme);

    this.updateButton(newType);
  }

  changeColors = (primary, secondary) => {
    let newTheme = { ...this.state.theme };

    // set new colors
    newTheme.palette.primary = primary;
    newTheme.palette.secondary = secondary;

    this.props.setTheme(newTheme);
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleCancel = () => {
    this.setState({ color1: "", color2: "", dialogOpen: false });
  };

  handleOk = () => {
    this.changeColors(this.state.color1, this.state.color2);
    this.setState({ color1: "", color2: "", dialogOpen: false });
  };

  handleColor1Click = () => {
    this.setState({ color1: "" });
  };

  handleColor2Click = () => {
    this.setState({ color2: "" });
  };

  updateButton(type) {
    // update button
    this.setState({
      icon: type === "light" ? <Brightness2 /> : <BrightnessHigh />
    });
  }

  getColorPreviews = () => {
    const colors = [
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
      blueGrey
    ];
    return (
      <div className="color-previews">
        {colors.map((color, i) => {
          return (
            <div key={i} className="color-preview">
              <ButtonBase
                onClick={() => this.selectColor(color)}
                style={{ backgroundColor: color[500] }}
                className="color-preview-circle mx-auto"
              />
            </div>
          );
        })}
      </div>
    );
  };

  getSelectedColors() {
    return (
      <div className="selected-colors mt-3">
        <div>
          <div>
            <div
              className="color-preview-circle--left"
              style={{ backgroundColor: this.props.theme.palette.primary[500] }}
            />
            <div
              className="color-preview-circle--right"
              style={{
                backgroundColor: this.props.theme.palette.secondary[500]
              }}
            />
          </div>
        </div>
        <div>
          <Typography>
            <ChevronRight size="small" />
          </Typography>
        </div>
        <div>
          <div>
            <ButtonBase
              onClick={this.handleColor1Click}
              className="color-preview-circle--left cursor-pointer"
              style={{ backgroundColor: this.state.color1[500] }}
            />
            <ButtonBase
              onClick={this.handleColor2Click}
              className="color-preview-circle--right cursor-pointer"
              style={{ backgroundColor: this.state.color2[500] }}
            />
          </div>
        </div>
        <div />
      </div>
    );
  }

  selectColor = color => {
    if (this.state.color1 === "") {
      this.setState({ color1: color });
    } else if (this.state.color2 === "") {
      this.setState({ color2: color });
    }
  };

  render() {
    return (
      <div>
        <IconButton
          onClick={this.changeType}
          color="primary"
        >
          {this.state.icon}
        </IconButton>
        <Button
          variant="outlined"
          onClick={this.handleDialogOpen}
          color="secondary"
          className="ml-3"
        >
          Pick Colors
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.dialogOpen}
          classes={{ paper: "colors-dialog" }}
        >
          <DialogTitle id="simple-dialog-title">
            {!this.state.color1
              ? "Select Primary Color Scheme"
              : "Select Secondary Color Scheme"}
          </DialogTitle>
          <DialogContent>
            <div className="colors-dialog-content">
              {this.getColorPreviews()}
              {this.getSelectedColors()}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="secondary">
              Cancel
            </Button>
            <Button
              disabled={this.state.color1 === "" || this.state.color2 === ""}
              variant="raised"
              onClick={this.handleOk}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.ptable.theme
  };
};

const mapDispatchToProps = {
  getTheme,
  setTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker);
