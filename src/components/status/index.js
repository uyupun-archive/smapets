import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-solid-svg-icons";

const Status = (props) => {
  switch (props.status) {
    case 0:
      return <FontAwesomeIcon icon={faLaugh} color="#fd0000" />;
    default:
      return <></>;
  }
};

export { Status };
