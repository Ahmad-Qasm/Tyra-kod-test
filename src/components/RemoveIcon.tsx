import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RemoveIcon: React.FC = () => {
  return <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />;
};

export default RemoveIcon;
