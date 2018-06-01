import React from "react";
import "./Footer.css";

import Typography from "@material-ui/core/Typography";

// fonts & icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Typography className="typo-sm">
          Made by{" "}
          <a
            href="http://www.davethedev.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Lee
          </a>{" "}
          for Michelle Kang <FontAwesomeIcon icon="heart" size="xs" />
        </Typography>
      </footer>
    );
  }
}
