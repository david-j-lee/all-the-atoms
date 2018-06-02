import {
  TOGGLE_MENU,
  GET_ELEMENTS,
  SEARCH_ELEMENTS,
  SET_ELEMENTAL_STATE,
  GET_THEME,
  SET_THEME,
  SET_DISPLAY_VALUE,
  SET_TEMP_UNIT
} from "./types";

import elementData from "../Data/elements.json";

// material
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

export const toggleMenu = isOpen => dispatch => {
  dispatch({
    type: TOGGLE_MENU,
    payload: !isOpen
  });
};

export const getElements = () => dispatch => {
  dispatch({
    type: GET_ELEMENTS,
    payload: elementData
  });
};

export const searchElements = term => dispatch => {
  dispatch({
    type: SEARCH_ELEMENTS,
    payload: term
  });
};

export const setElementalState = temp => dispatch => {
  dispatch({
    type: SET_ELEMENTAL_STATE,
    payload: temp
  });
};

export const getTheme = () => dispatch => {
  let theme = localStorage.getItem("theme");
  try {
    theme = JSON.parse(theme);
    const palette = theme.palette.type; // to trigger error if using old settings
  } catch (e) {
    theme = {
      palette: {
        type: "light",
        primary: indigo,
        secondary: pink,
        error: red,
        contrastThreshold: 3
      }
    };
    localStorage.setItem("theme", JSON.stringify(theme));
  }
  if (!theme || theme.palette === undefined) {
  }
  dispatch({
    type: GET_THEME,
    payload: theme
  });
};

export const setTheme = theme => dispatch => {
  localStorage.setItem("theme", JSON.stringify(theme));
  dispatch({
    type: SET_THEME,
    payload: theme
  });
};

export const setTempUnit = tempUnit => dispatch => {
  localStorage.setItem("tempUnit", tempUnit);
  dispatch({
    type: SET_TEMP_UNIT,
    payload: tempUnit
  });
};

export const setDisplayValue = value => dispatch => {
  dispatch({
    type: SET_DISPLAY_VALUE,
    payload: value
  });
};
