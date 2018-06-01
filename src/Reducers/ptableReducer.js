import React from "react";

import {
  GET_ELEMENTS,
  SEARCH_ELEMENTS,
  SET_ELEMENTAL_STATE,
  GET_THEME,
  SET_THEME,
  TOGGLE_MENU,
  SET_DISPLAY_VALUE,
  SET_TEMP_UNIT
} from "../Actions/types";

import typeData from "../Data/types.json";

const initialState = {
  elements: [],
  search: "",
  temperature: "",
  temperatureUnit: "",

  theme: {},

  displayValue: "atomic-mass",
  displayValueText: "Atomic Mass",
  menuMobileOpen: false,
  showAtomicWeightOnMobile: true,
  showAtomicNumberOnMobile: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuMobileOpen: action.payload
      };
    case GET_ELEMENTS:
      let tempUnit = localStorage.getItem("tempUnit");
      return {
        ...state,
        elements: setupElements(action.payload, state.displayValue, tempUnit),
        temperatureUnit: tempUnit
      };
    case SEARCH_ELEMENTS:
      return {
        ...state,
        elements: searchElements([...state.elements], action.payload),
        search: action.payload
      };
    case SET_ELEMENTAL_STATE:
      return {
        ...state,
        elements: setElementalStates(
          [...state.elements],
          action.payload,
          state.temperatureUnit
        ),
        temperature: action.payload
      };
    case GET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_TEMP_UNIT:
      return {
        ...state,
        elements: setElementalStates(
          [...state.elements],
          state.temperature,
          action.payload
        ),
        temperatureUnit: action.payload
      };
    case SET_DISPLAY_VALUE:
      return {
        ...state,
        elements: getDisplayValues([...state.elements], action.payload),
        displayValue: action.payload,
        displayValueText: getDisplayValueText(action.payload)
      };
    default:
      return state;
  }
}

function setupElements(elements, displayValue, unit) {
  if (!displayValue || displayValue === "") {
    displayValue = "atomic-mass";
  }
  elements.forEach(element => {
    element.isActive = true;

    // assign temp
    var type = typeData.find(
      e => e["name-singular"].toLowerCase() === element.type.toLowerCase()
    );
    if (type !== undefined) {
      element.types = element.type + " " + type["name-plural"];
    }

    // displayed value
    element["display-value"] = getDisplayValue(element, displayValue);

    // temps
    element["melting-point-converted"] = convertToKelvin(
      element["melting-point"],
      unit
    );

    element["boiling-point-converted"] = convertToKelvin(
      element["boiling-point"],
      unit
    );
  });
  return elements;
}

function searchElements(elements, search) {
  search = search.toLowerCase();
  elements.forEach((element, i) => {
    if (search === "" || search === undefined) {
      element.isActive = true;
    } else {
      // search by property with : delimiter
      if (search.indexOf(":") !== -1) {
        var terms = search.split(":");
        // only search if key and value is found
        if (terms.length === 2) {
          if (element[terms[0]] === undefined) {
            element.isActive = true;
          } else {
            // account for plural of type
            if (terms[0] === "type") {
              terms[0] = "types";
            }
            var propVal = element[terms[0]].toString().toLowerCase();
            if (propVal.indexOf(terms[1].trim()) !== -1) {
              element.isActive = true;
            } else {
              element.isActive = false;
            }
          }
        }
      } else {
        // search if no delimiter
        if (element["atomic-number"].toString().indexOf(search) !== -1)
          element.isActive = true;
        else if (element["symbol"].toLowerCase().indexOf(search) !== -1)
          element.isActive = true;
        else if (element["atomic-name"].toLowerCase().indexOf(search) !== -1)
          element.isActive = true;
        else if (element["type"].toLowerCase().indexOf(search) !== -1)
          element.isActive = true;
        else element.isActive = false;
      }
    }
  });
  return elements;
}

function setElementalStates(elements, temp, unit) {
  switch (unit.toLowerCase()) {
    case "f":
      temp = convertFahrenheitToKelvin(temp);
      break;
    case "c":
      temp = convertCelsiusToKelvin(temp);
      break;
    default:
      break;
  }
  elements.forEach((element, i) => {
    if (temp === undefined || temp === "") {
      element.state = undefined;
    } else {
      if (
        !element["melting-point"] ||
        parseFloat(temp) < parseFloat(element["melting-point"])
      ) {
        element.state = "solid";
      } else if (
        !element["boiling-point"] ||
        parseFloat(temp) < parseFloat(element["boiling-point"])
      ) {
        element.state = "liquid";
      } else {
        element.state = "gas";
      }
    }

    // temps
    element["melting-point-converted"] = convertToKelvin(
      element["melting-point"],
      unit
    );

    element["boiling-point-converted"] = convertToKelvin(
      element["boiling-point"],
      unit
    );
  });
  return elements;
}

function getDisplayValueText(value) {
  switch (value) {
    case "atomic-mass":
      return "Atomic Mass";
    case "electronegativity":
      return "Electronegativity";
    case "electron-configuration":
      return "Electron Configuration";
    case "ionization-energies":
      return "Ionization Energies";
    default:
      break;
  }
}

function getDisplayValues(elements, displayValue) {
  elements.forEach(element => {
    element["display-value"] = getDisplayValue(element, displayValue);
  });
  return elements;
}

function getDisplayValue(element, displayValue) {
  if (displayValue === "electron-configuration") {
    return getElectronConfiguration(element["electron-configuration"]);
  } else if (displayValue === "ionization-energies") {
    if (element["ionization-energies"]) {
      return element["ionization-energies"].first;
    }
  } else if (displayValue === "atomic-mass" && element["atomic-mass"] < 0) {
    return "[" + element["atomic-mass"] * -1 + "]";
  } else if (typeof element[displayValue] === "number") {
    const sigFigs = displayValue === "atomic-mass" ? 4 : 3;
    return (
      element[displayValue].toFixed(
        sigFigs - element[displayValue].toFixed(0).length
      ) + ""
    );
  } else {
    return element[displayValue];
  }
}

function getElectronConfiguration(value) {
  if (value) {
    const values = value.split(" ");
    return values.map((value, i) => {
      const split = value.split("^");
      return (
        <span key={i}>
          {split[0]}
          <sup>{split[1]}</sup>
        </span>
      );
    });
  }
}

function convertCelsiusToKelvin(celsius) {
  if (celsius === "" || !parseFloat(celsius)) {
    return "";
  } else {
    return parseFloat(celsius) + 273.15;
  }
}

function convertFahrenheitToKelvin(fahrenheit) {
  if (fahrenheit === "" || !parseFloat(fahrenheit)) {
    return "";
  } else {
    return ((parseFloat(fahrenheit) + 459.67) * 5.0 / 9.0).toFixed(2);
  }
}

function convertToKelvin(kelvin, unit) {
  if (kelvin === "") {
    return "";
  } else {
    switch (unit) {
      case "c":
        return (kelvin - 273.15).toFixed(2) + " " + unit.toUpperCase();
      case "f":
        return (kelvin * 9 / 5 - 459.67).toFixed(2) + " " + unit.toUpperCase();
      default:
        return kelvin + " " + unit.toUpperCase();
    }
  }
}
