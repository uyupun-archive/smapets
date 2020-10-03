import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaugh,
  faDizzy,
  faBookDead,
  faMeh,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

const Status = (props) => {
  if (props.ratio >= 80) {
    return <FontAwesomeIcon icon={faLaugh} color="#ff00ff" />;
  } else if (props.ratio >= 50) {
    return <FontAwesomeIcon icon={faSmile} color="#fd0000" />;
  } else if (props.ratio >= 20) {
    return <FontAwesomeIcon icon={faMeh} color="#ffd700" />;
  } else if (props.ratio > 0) {
    return <FontAwesomeIcon icon={faDizzy} color="#0000cd" />;
  } else {
    return <FontAwesomeIcon icon={faBookDead} color="#8a2be2" />;
  }
};

export { Status };
