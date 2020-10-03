import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaugh,
  faFrownOpen,
  faSadTear,
  faDizzy,
  faBookDead,
} from "@fortawesome/free-solid-svg-icons";

const Status = (props) => {
  if (props.ratio >= 80) {
    return <FontAwesomeIcon icon={faLaugh} color="#fd0000" />;
  } else if (props.ratio >= 50) {
    return <FontAwesomeIcon icon={faFrownOpen} color="#fd0000" />;
  } else if (props.ratio >= 20) {
    return <FontAwesomeIcon icon={faSadTear} color="#fd0000" />;
  } else if (props.ratio > 0) {
    return <FontAwesomeIcon icon={faDizzy} color="#fd0000" />;
  } else {
    return <FontAwesomeIcon icon={faBookDead} color="#fd0000" />;
  }
};

export { Status };
